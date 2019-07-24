// pages/updatePwd/updatePwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendCode:'获取验证码'

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
  entryCode:function(){
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