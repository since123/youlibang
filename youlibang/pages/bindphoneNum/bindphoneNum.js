// pages/bindphone/bindphone.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 验证手机号
    ifTruePhone: false,//验证手机号输入格式是否正确的标志，默认为输入为空，故值为false
    loginPhone: false,
    loginPwd: false,
    ifCodeagain: true,//是否可以重新获取验证码
    phoneValue: '',//手机号输入值
    // 验证码是否正确
    codeValue: '',//验证码输入值
    ifTrueCode: true,//验证码输入是否为真的标志
    getNewCode: '',//获取到的验证码
    ajxtrue: false,
    getText2: '获取验证码',//验证码上字段显示
  },
  //手机号验证
  blurPhone: function (e) {
    let phone = e.detail.value;//获取手机号输入值
    this.setData({ phoneValue: phone })
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        ifTruePhone: false//输入手机号格式不对
      })
      console.log(phone.length)
      if (phone.length >= 11 || phone.length == 0) {//长度不对
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 1000
        })
      }
    } else {
      this.setData({
        ifTruePhone: true//输入手机号格式正确
      })
    }
  },

  //验证码
  code: function (e) {
    let that = this;
    let codeValue = e.detail.value;//获取输入的验证码
    let getNewCode = this.data.getNewCode;
    that.setData({
      codeValue: codeValue,
      ifTrueCode: false,
    })
    if (codeValue.length >= 4) {
      if (codeValue == getNewCode) {
        that.setData({
          ifTrueCode: true,
        })
      } else {
        that.setData({
          ifTrueCode: false,
        })
        wx.showModal({
          content: '输入验证码有误',
          showCancel: false,
          success: function (res) { }
        })
      }
    }

  },
  sendCodeBtn: function () {
    let ifCodeagain = this.data.ifCodeagain;
    console.log(ifCodeagain)
    let ifTruePhone = this.data.ifTruePhone;
    console.log(ifTruePhone)
    let phone = this.data.phoneValue;
    console.log(phone)
    let n = 59;
    let that = this;
    if (!ifTruePhone) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 1000
      })
    } else {
      if (ifCodeagain) {
        this.setData({
          ifCodeagain: false
        })
        let lovetime = setInterval(function () {
          let str = '(' + n + ')' + '重新获取'
          that.setData({
            getText2: str
          })
          if (n <= 0) {
            that.setData({
              ifCodeagain: true,
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
  formSubmit(e) {
    let val = e.detail.value
    console.log('val', val)
    var phone = val.phone //电话
    var phoneCode = val.phoneCode //验证码
    if (ifTruePhone) {
      if (ifTrueCode) {
        //进行提交
        httpReq({
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          url: ApiUrl.phplist + '',
        }).then((res) => {
          console.log(res)
        })
      } else {
        wx.showModal({
          content: '输入验证码有误',
          showCancel: false,
        })
      }
    } else {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
      })
    }
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