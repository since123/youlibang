// pages/retailOrder/retailOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /** 
 * 点击tab切换 
 */
  swichNav: function (e) {
    var that = this;
    var prmove = that.data.prmove;
    var prmove_n = that.data.prmove_n;
    var prmove_t = that.data.prmove_t;
    var prmove_s = that.data.prmove_s;
    // console.log('prmove:' + prmove);
    // console.log('prmove_n:' + prmove_n);
    // console.log('prmove_t:' + prmove_t);
    // console.log('prmove_s:'+prmove_s);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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