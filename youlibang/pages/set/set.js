// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //更换手机号
  updatephone:function(){
    wx.navigateTo({
      url: '../updatePhone/updatePhone',
    })
  },
  updatePwd:function(){
    wx.navigateTo({
      url: '../updatePwd/updatePwd',
    })
  },
  //退出登录
  logout:function(){
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show,
      tip: '您点击了【是】按钮！',
      buttonDisabled: !this.data.buttonDisabled
    })
  },

  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      tip: '您点击了【否】按钮！'
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