// pages/applyRefund/applyRefund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: true,
    goods:[
      {
        src: '../../images/kefu (2).png',
        title: '好看的耳机质量好的耳机价格贵的耳机',
        properties: '黑色，L, 高级'
      },{
        src: '../../images/headImg.png',
        title: '好看的耳机质量好的贴纸价格贵的贴纸',
        properties: '红色，L, 好看'
      }]
  },
  /**
   * 请选择
   */
  getReason: function() {
    this.setData({
      status: false,
    })
  },
  /**
   * 控制幕布
   */
  showDetail: function() {
    this.setData({
      status: true,
    })
  },
  /**
   * 单选选择退货原因
   */
  refundway: function(e) {
    console.log("选择了原因！")
    console.log(e)
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