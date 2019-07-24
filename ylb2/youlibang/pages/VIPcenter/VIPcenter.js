// pages/VIPcenter/VIPcenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  applyVIP:function(){
    wx.navigateTo({
      url: '../applyVIP/applyVIP',
    })
  },
  //提现
  withdraw:function(){
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  },
  lookdetail:function(){
    wx.navigateTo({
      url: '../rebateDetail/rebateDetail',
    })
  },
  tuiguang:function(){
    wx.navigateTo({
      url: '../extension_QRcode/extension_QRcode',
    })
  },
  //我的团队
  myteam:function(){
    wx.navigateTo({
      url: '../myteam/myteam',
    })
  },
  //待结算返利
  settledRebate:function(){
    wx.navigateTo({
      url: '../settledRebate/settledRebate',
    })
  },
  //分销订单
  retailOrder: function(){
    wx.navigateTo({
      url: '../retailOrder/retailOrder',
    })
  },
  //提现明细
  cashoutDetail: function(){
    wx.navigateTo({
      url: '../cashoutDetail/cashoutDetail'
    })
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