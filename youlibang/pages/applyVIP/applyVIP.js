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
    payway: 'wexinPayfor',
    ifxianxia: true,
    ifError: true,
    errorMessage: '',
    ifReadyonly: '',
    autoplay: false,
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
      console.log(res)
      let VIPList = res.data.lists.act
      let inviterID = res.data.lists.inviter_id
      if (inviterID) {
        that.setData({
          inviterID: inviterID,
          ifReadyonly: readonly
        })
      } 
      let vipRules = []
      for (let m in VIPList) {
        // console.log(VIPList[m])
        let vipInform = {}
        let active = []
        vipInform.userGrade = VIPList[m].lev_name
        vipInform.rechargeMoney = parseFloat(VIPList[m].level_amount)
        vipInform.viplevel = VIPList[m].m_level
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
    let grade = e.currentTarget.dataset.viplevel //等级
    console.log(e)
    console.log(e.currentTarget.dataset.viplevel)
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
    if (wx.getStorageSync('vipid')) {
      wx.showModal({
        title: '提示',
        content: '你已经是会员了',
      })
      return false
    } else {
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
          wx.uploadFile({
            url: ApiUrl.phplist + 'member/upimg?token=' + that.data.token,
            filePath: that.data.frontID,
            name: 'card_one',
            header: {
              "Content-Type": "multipart/form-data"//记得设置
            },
            success(res) {
              wx.setStorageSync('frontID', that.data.frontID)
              console.log(that.data.frontID)
              console.log('上传成功')
            }
          })
        },
      })
    }
  },
  /**
   * 获取身份证国徽页
   */
  changeBackID: function() {
    let that = this
    if (wx.getStorageSync('vipid')) {
      wx.showModal({
        title: '提示',
        content: '你已经是会员了',
      })
      return false
    } else {
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
          wx.uploadFile({
            url: ApiUrl.phplist + 'member/upimg?token=' + that.data.token,
            filePath: that.data.backID,
            name: 'card_two',
            header: {
              "Content-Type": "multipart/form-data"//记得设置
            },
            success(res) {
              wx.setStorageSync('backID', that.data.backID)
              console.log('上传成功')
            }
          })
        },
      })
    }
   
  },
  /**
   * 获取营业执照页
   */
  changeBusinessLicense: function() {
    let that = this
    if (wx.getStorageSync('vipid')) {
      wx.showModal({
        title: '提示',
        content: '你已经是会员了',
      })
      return false
    } else {
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
          wx.uploadFile({
            url: ApiUrl.phplist + 'member/upimg?token=' + that.data.token,
            filePath: that.data.businessLicense,
            name: 'license',
            header: {
              "Content-Type": "multipart/form-data"//记得设置
            },
            success(res) {
              wx.setStorageSync('businessLicense', that.data.businessLicense)
              console.log('上传成功')
            }
          })
        },
      })
    }
   
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
    let that = this
    if (wx.getStorageSync('loginStatus') == false) {
      wx.showModal({
        title: '提示！',
        content: '请先登录',
      })
      return false
    } else {
      var status = that.data.status;
      console.log(that.data.payway)
      if (that.data.payway == 'underLinePayfor') {
        that.setData({
          ifxianxia: false,
        })
      }
      // console.log("触发了点击事件，弹出toast")
      status = !status;
      that.setData({
        status: status,
      })　　
    }　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  },

  /**
   * 微信付款成功，返回后台数据
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
      let errorMessage =  res.data.msg;
      if (errorMessage != '') {
        that.setData({
          ifError: false,
          errorMessage: errorMessage
        })
      }
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
    })
  },
  errorconfirm: function () {
    this.setData({
      ifError: true,
      status: false
    })
  },
  errorcancel: function () {
    this.setData({
      ifError: true,
      status: false
    })
  },

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
    if (payway == 'underLinePayfor') {
      this.setData({
        ifxianxia: false,
        status: false
      })
    } else {
      this.setData({
        ifxianxia: true
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
      status: status,
    })
  },
  //确认支付
  confirmPay: function () {
    if (this.data.payway == 'wexinPayfor') {
      this.confirmWeixinPay()
    } 
  },
  //取消线下支付
  xianxiaconfirm: function () {
    this.setData({
      ifxianxia: true,
      status: false
    })
  },
  //确认看到线下支付的回执
  xianxiacancel: function () {
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
    this.showPicture()
  },
  //成为会员操作成功之后显示三张图片
  showPicture: function() {
    let that = this
    let frontID = wx.getStorageSync('frontID') ? wx.getStorageSync('frontID') : ''
    let backID = wx.getStorageSync('backID') ? wx.getStorageSync('backID') : ''
    let businessLicense = wx.getStorageSync('businessLicense') ? wx.getStorageSync('businessLicense') : ''
    let inform_frontID = wx.getStorageSync('inform').card_one
    let inform_backID = wx.getStorageSync('inform').card_two
    let inform_businessLicense = wx.getStorageSync('inform').license
    // console.log(frontID)
    // console.log(backID)
    // console.log(businessLicense)
    // console.log(inform_frontID)
    // console.log(inform_backID)
    // console.log(inform_businessLicense)
    that.setData({
      frontID: frontID == '' ? inform_frontID : frontID,
      backID: backID == '' ? inform_backID : backID,
      businessLicense: businessLicense == '' ? inform_businessLicense : businessLicense,
    })
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