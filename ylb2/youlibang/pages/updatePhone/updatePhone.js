// pages/updatePhone/updatePhone.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 验证手机号
    loginPhone: false,
    loginPwd: false,
    loveChange: true,
    hongyzphone: '',
    // 验证码是否正确
    zhengLove: true,
    huoLove: '',
    ajxtrue: false, 
    getText2: '获取验证码',
  },
  //手机号验证
  blurPhone: function (e) {
    let phone = e.detail.value;
    this.setData({ hongyzphone: phone })
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        lovePhone: false
      })
      console.log(phone.length)
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 1000
        })
      }
    } else {
      this.setData({
        lovePhone: true

      })
    }
  },
  code:function(){
    let that = this;
    let yanLove = e.detail.value;
    let huoLove = this.data.huoLove;
    that.setData({
      yanLove: yanLove,
      zhengLove: false,
    })
    if (yanLove.length >= 4) {
      if (yanLove == huoLove) {
        that.setData({
          zhengLove: true,
        })
      } else {
        that.setData({
          zhengLove: false,
        })
        wx.showModal({
          content: '输入验证码有误',
          showCancel: false,
          success: function (res) { }
        })
      }
    }

  },
  sendCodeBtn:function(){
    let loveChange = this.data.loveChange;
    console.log(loveChange)
    let lovePhone = this.data.lovePhone;
    console.log(lovePhone)
    let phone = this.data.hongyzphone;
    console.log(phone)
    let n = 59;
    let that = this;
    if (!lovePhone) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 1000
      })
    } else {
      if (loveChange) {
        this.setData({
          loveChange: false
        })
        let lovetime = setInterval(function () {
          let str = '(' + n + ')' + '重新获取'
          that.setData({
            getText2: str
          })
          if (n <= 0) {
            that.setData({
              loveChange: true,
              getText2: '重新获取'
            })
            clearInterval(lovetime);
          }
          n--;
        }, 1000);

        //获取验证码接口写在这里
        //例子 并非真实接口
        app.agriknow.sendMsg(phone).then(res => {
          console.log('请求获取验证码.res =>', res)
        }).catch(err => {
          console.log(err)
        })


      }
    }
  },
  // 表单提交
  
    formSubmit(e){
      let val = e.detail.value
      console.log('val', val)
      var phone = val.phone //电话
      var phoneCode = val.phoneCode //验证码
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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