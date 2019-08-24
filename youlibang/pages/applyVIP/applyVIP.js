// pages/applyVIP/applyVIP.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    currentIndex: 0,//当前默认普通VIP
    currentRechargemoney: 100,//当前充值金额默认为100
    // recommendID: 0303030,
    frontID: wx.getStorageSync('inform').card_one,
    backID: wx.getStorageSync('inform').card_two,
    businessLicense: wx.getStorageSync('inform').license,
    imgList: [],
    inviterID: '',
    ifhidden: true,
    informHidden: true,
    pageSize: 4,
    pageIndex: 0,
    buttonText: '会员专享超多优惠返利！',
    token: wx.getStorageSync('token'),
    vipRules: [],
    grade: '1',
    vipid: wx.getStorageSync('vipid'),
    payway: '',
    ifxianxia: true,
  },
  /**
   * 分页
   */
  getPage: function() {
    let that = this
    let size = 4
    let length = this.data.vipRules.length
    let newArr = [];
    let pageNum = Math.ceil(length/size * 1.0)
    let j = 0;
    while (j < pageNum) {
      let spare = length-j*size >= size ? size:length - j*size;
      let temp = this.data.vipRules.slice(j*size, j*size + spare)
      newArr.push(temp)
      j++
    }
    this.setData({
      vipRules: newArr
    })
  },
  /**
   * 获得页面数据
   */
  getinformation() {
    let that = this
    httpReq({
      url: ApiUrl.phplist + 'operatedata/actlist?token=' + this.data.token,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((res) => {
      let VIPList = res.data.lists.act
      let inviterID = res.data.lists.inviter_id
      if (inviterID == 0) {
        that.setData({
          inviterID: inviterID
        })
        console.log('没有邀请id,可输入朋友的也可不输入')
      } else {
        that.setData({
          ifReadyonly: readonly
        })
      }
      let vipRules = []
      for (let m in VIPList) {
        // console.log(VIPList[m])
        let vipInform = {}
        let active = []
        vipInform.userGrade = VIPList[m].lev_name
        vipInform.rechargeMoney = parseInt(VIPList[m].level_amount) 
        for (let n in VIPList[m].reward) {
          let activeInfirm = {}
          activeInfirm.preferentialInfo = VIPList[m].reward[n].activity_v
          // activeInfirm.
          active.push(activeInfirm)
          vipInform.preferential = active
        }
        
        vipRules.push(vipInform)
        
        that.setData({
          vipRules: vipRules
        })
      }
      this.getPage()
    })
  },
  /**获得当前滑块index */
  getPageIndex: function(e) {
    let that = this
    that.setData({
      pageIndex: e.detail.current
    })
  },
  /**
   * 获取当前充值等级
   */
  chooseGrade: function(e) {
    let current = e.currentTarget.dataset.current //当前页面某个等级的index
    let pageIndex = this.data.pageIndex //当前页面的index
    let size = this.data.pageSize //每页数据量
    let grade = size * pageIndex + 1 + current //等级
    console.log(grade)
    this.setData({
      currentIndex: current,
      grade: grade
        //把获取的自定义current赋给当前组件的currentIndex(即获取当前组件)  
    })
    if (grade > 4) {
      this.setData({
        ifhidden: false
      })
    } else {
      this.setData({
        ifhidden: true
      })
    }
  },
  /**
   * 优惠明细
   */
  returnPage: function() {
    let that = this
    if (this.data.informHidden) {
      that.setData({
        informHidden: false,
        buttonText: '收起会员优惠返利信息'
      })
    } else {
      that.setData({
        informHidden: true,
        buttonText: '会员专享超多优惠返利！'
      })
    }
    
  },
  /**
   * 获取身份证头像页
   */
  changeFrontID: function() {
    let that = this
    wx.chooseImage({
      count: 1,//默认9f
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {//// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        //console.log(tempFilePaths)
        that.setData({
          frontID: tempFilePaths[0]
        })
        // console.log(that.data.frontID)
         that.data.imgList.push(that.data.frontID)
         wx.uploadFile({
           url: ApiUrl.phplist + 'member/upimg?token=' + that.data.token,
           filePath: that.data.frontID,
           name: 'card_one',
           header: {
             "Content-Type": "multipart/form-data"//记得设置
           },
           success(res) {
             console.log(res)
           }
         })
      },
    })
  },
  /**
   * 获取身份证国徽页
   */
  changeBackID: function() {
    let that = this
    wx.chooseImage({
      count: 1,//默认9f
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
       // console.log(tempFilePaths)
        that.setData({
          backID: tempFilePaths[0]
        })
        // console.log(that.data.backID)
        that.data.imgList.push(that.data.backID)
        wx.uploadFile({
          url: ApiUrl.phplist + 'member/upimg?token=' + that.data.token,
          filePath: that.data.backID,
          name: 'card_two',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          success(res) {
            console.log(res)
          }
        })
      },
    })
  },
  /**
   * 获取营业执照页
   */
  changeBusinessLicense: function() {
    let that = this
    wx.chooseImage({
      count: 1,//默认9f
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
       // console.log(tempFilePaths)
        that.setData({
          businessLicense: tempFilePaths[0]
        })
        // console.log(that.data.businessLicense)
       that.data.imgList.push(that.data.businessLicense)
        wx.uploadFile({
          url: ApiUrl.phplist + 'member/upimg?token=' + that.data.token,
          filePath: that.data.businessLicense,
          name: 'license',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          success(res) {
            console.log(res)
          }
        })
      },
      // radioChange: function (e) {
      //   console.log('radio发生change事件，携带value值为：', e.detail.value)
      // },
    })
  },
  /**
   * 获取输入框的内容
   */
  getInputValue:function(e) {
    let inviterID = e.detail.value
    if (inviterID = '') {
      this.setData({
        inviterID: '0'
      })
    } else {
      this.setData({
        inviterID: e.detail.value
      })
    } 
    console.log(this.data.inviterID)
  },
 
  
  applyClick: function () {
    var status = this.data.status;
    // console.log("触发了点击事件，弹出toast")
    status = !status;
    this.setData({
      status: status
    })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  },

  /**
   * 修改成功，返回后台数据
   */
  confirmWeixinPay() {
    var that = this;
    var token = wx.getStorageSync("token")
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/applymber?token=' + that.data.token + '&level=' + that.data.grade + '&inviter=' + that.data.inviterID,
      // url: ApiUrl.phplist + 'order/orderpay?pay_amount=' + this.data.amount,
    }).then((res) => {
      console.log(res)
      wx.requestPayment({
        timeStamp: res.data.lists.timeStamp,
        nonceStr: res.data.lists.nonceStr,
        package: res.data.lists.package,
        signType: 'MD5',
        paySign: res.data.lists.paySign,
        success: function (res) {
          // success
          console.log(res);
        },
        fail: function (res) {
          // fail
          console.log(res);
        },
        complete: function (res) {
          // complete
          that.setData({
            status: false
          })

        }
      })
      // if (res.data.code == '1') {
      //   that.setData({
      //     payParams: res.data.data // 后端从微信得到的统一下单的参数
      //   })
      //   wx.showToast({
      //     title: '充值成功',
      //     icon: "success",
      //     duration: 2000, //持续的时间
      //   })
      //   setTimeout(function () {
      //     wx.navigateTo({
      //       url: '../recharge/recharge',
      //     })
      //   }, 1000)  //定时函数确保状态显示之后再返回上一页
      //   that.xcxPay(); // 拿到统一下单的参数后唤起微信支付页面
      // }
    })
  },

// },
  /**
   * 立即申请
   */
//   applyClick:function() {
//     判断是否有推荐id，
//     if (金额小于10000) {
//       不上传三张图片，只是调用支付借口，
      
//     }
//     else {
// 上传图片，调用支付接口
//     }
//   },
  //控制隐藏
  ifhidden: function() {
    ifhidden: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token')
    })
    this.getinformation()
  },
  //选择支付方式
  payway(e) {
    let payway = e.detail.value
    let ifxianxia = this.data.ifxianxia
    if (payway == 'underLinePayfor') {
      ifxianxia = !ifxianxia
      this.setData({
        ifxianxia: ifxianxia
      })
    }
    this.setData({
      payway: payway
    })
    console.log(this.data.payway)
  },

  cancelPay: function () {
    var status = this.data.status;
    status = !status;
    this.setData({
      status: status
    })
  },
  //确认支付
  confirmPay: function () {
    if (this.data.payway == 'wexinPayfor') {
      this.confirmWeixinPay()
    } else {
      this.confirmXianxiaPay()
    }
  },
  //取消线下支付
  xianxiaconfirm: function () {
    this.setData({
      ifxianxia: true
    })
  },
  //确认看到线下支付的回执
  xianxiacancel: function () {
    this.setData({
      ifxianxia: true
    })
  },
  confirmXianxiaPay: function() {
    this.setData({
      ifxianxia: true,
      status: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})