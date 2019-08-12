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
    currentIndex: 0,//当前默认普通VIP
    currentRechargemoney: 100,//当前充值金额默认为100
    // recommendID: 0303030,
    frontID: '../../images/idCard@2x.png',
    backID: '../../images/idCardbg@2x.png',
    businessLicense: '../../images/Business_license@2x.png',
    imgList: [],
    inputID: '',
    ifhidden: true,
    informHidden: true,
    pageSize: 4,
    buttonText: '会员专享超多优惠返利！',
    token: '11',
    vipRules: [
      {
        userGrade: '普通VIP',
        rechargeMoney: 100,
        preferentialInfo: ''
      },{
        userGrade: '入门VIP',
        rechargeMoney: 500,
        preferentialInfo: '限额1000名'
      },{
        userGrade: '初级VIP',
        rechargeMoney: 1000,
        preferentialInfo: '充值可得免费铺货1000元'
      },{
        userGrade: '中级VIP',
        rechargeMoney: 1000,
        preferentialInfo: '充值可得免费铺货5000元'
      },
      {
        userGrade: '高级VIP',
        rechargeMoney: 3000,
        preferentialInfo: '充值可得免费铺货5000元'
      },
      {
        userGrade: '经销级VIP',
        rechargeMoney: 5000,
        preferentialInfo: '充值可得免费铺货5000元'
      },
      {
        userGrade: '特约经销VIP',
        rechargeMoney: 10000,
        preferentialInfo: '充值可得免费铺货5000元'
      },
      {
        userGrade: '总经销VIP',
        rechargeMoney: 20000,
        preferentialInfo: '充值可得免费铺货5000元充值可得免费铺货5000元充值可得免费铺货5000元充值可得免费铺货5000元充值可得免费铺货5000元'
      },

      ]
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
    })
  },
  /**
   * 获取充值金额
   */
  chooseGrade: function(e) {
    // console.log(e)
    let current = e.currentTarget.dataset.current
    console.log(current)
    let rechargemoney = e.currentTarget.dataset.rechargemoney//获取当前充值金额
    console.log(rechargemoney)
    this.setData({
      currentIndex: current,
      currentRechargemoney: rechargemoney,
        //把获取的自定义current赋给当前组件的currentIndex(即获取当前组件)  
    })
    if (rechargemoney >= 3000) {
      this.setData({
        ifhidden: false
      })
    } else {
      this.setData({
        ifhidden: true
      })
    }
     //获取自定义的current  
  },
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
        console.log(tempFilePaths)
        that.setData({
          frontID: tempFilePaths[0]
        })
        // console.log(that.data.frontID)
         that.data.imgList.push(that.data.frontID)
      },
      radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
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
        that.setData({
          backID: tempFilePaths[0]
        })
        that.data.imgList.push(that.data.backID)
      },
      radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
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
        that.setData({
          businessLicense: tempFilePaths[0]
        })
        that.data.imgList.push(that.data.businessLicense)
      },
      radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
      },
    })
  },
  /**
   * 获取输入框的内容
   */
  getInputValue:function(e) {
    this.setData({
      inputID: e.detail.value
    })
    console.log(this.data.inputID)
  },
  applyClick: function () { 
    let token = wx.getStorageSync('token')
    let currentRechargemoney = this.data.currentRechargemoney
    let inputID = this.data.inputID
    wx.uploadFile({
      // url: ApiUrl.phplist + 'user/cardUpload?uploads='+ '['+'card_one=' + cardone + ',card_two=' + cardtwo + ',license=' + license +']', //里面填写你的上传图片服务器API接口的路径
      url: ApiUrl.phplist + 'user/cardUpload?uploads=' + this.data.imgList,
      filePath: this.data.imgList,//要上传文件资源的路径，此处只有一张，为数组第一项， String类型 
      // name: '',//按个人情况填写，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      success: function(res) {
        const data = res.data
        //当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
        if (res.statusCode = 200) {
          // var data = res.data
          // var statusCode = res.statusCode
          // console.log("返回值1" + data);
          // console.log("返回值2" + statusCode)
          //这里调用后台的修改操作， tempFilePaths[0],是上面uploadFile上传成功，然后赋值到修改这里。
          httpReq({
            url: ApiUrl.phplist + 'operatedata/actlist?token=' + token + '&currentRechargemoney=' + currentRechargemoney + '&inputID=' + inputID,
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            method: 'POST',
          }).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2500
              })
              //wx.uploadFile自已有一个this，我们刚才上面定义的let that = this 把this带进来
              that.setData({
                src: tempFilePaths[0]//要上传文件资源的路径
              });
            }
          })
          // wx.request({
            // url: ApiUrl.phplist + 'operatedata/actlist?token=' + this.data.token,
            // header: {
            //   'Content-Type': 'application/json',
            //   'Accept': 'application/json'
            // },
            // method: 'POST',
            // success: function (res) {
              // if (res.data.code == 200) {
              //   wx.showToast({
              //     title: '修改成功',
              //     icon: 'success',
              //     duration: 2500
              //   })
              //   //wx.uploadFile自已有一个this，我们刚才上面定义的let that = this 把this带进来
              //   that.setData({
              //     src: tempFilePaths[0]//要上传文件资源的路径
              //   });
              // }
            // }
          // })
        }
      }
    })
  },
  ifhidden: function() {
    ifhidden: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPage()
    this.setData({
      token: wx.getStorageSync('token')
    })
    this.getinformation()
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