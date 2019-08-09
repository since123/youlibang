// pages/updatePwd/updatePwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 验证码是否正确
    codeValue: '',//验证码输入值
    ifTrueCode: true,//验证码输入是否为真的标志
    getNewCode: '',//获取到的验证码
    ajxtrue: false, 
    getText2: '获取验证码',//验证码上字段显示
    //密码格式
    passwordValue: '',
    // ifTruePassword: false
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
  //输入验证码
  entryCode:function(e){
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
  /**
   * 获取验证码
   */
  sendCodeBtn: function () {
    let ifCodeagain = this.data.ifCodeagain;
    console.log(ifCodeagain)
    let n = 59;
    let that = this;
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
  },
  /**
   * 输入密码
   */
  entryPassword: function(e) {
    let that = this
    let password = e.detail.passwordValue
    that.setData({
      passwordValue: password
    })
    
  },
  /**
   * 提交表单
   */
  formSubmit: function() {
    let val = e.detail.value
    console.log('val', val)
    var phone = val.code //电话
    var phoneCode = val.password //验证码
    if (!ifTrueCode){
      wx.showModal({
        content: '输入验证码有误',
        showCancel: false,
      })
    }
    else {
      if (!(/^[a-zA-Z0-9]{6,20}/).test(this.data.passwordValue)) {
        wx.showModal({
          content: '输入密码有误',
          showCancel: false,
        })
      } else {
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
      }
    }
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