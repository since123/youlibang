// pages/questionDetail/questionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     arr:["该问题暂时还没有解答！详情请咨询400-800123","具体请咨询12315！详情请咨询400-800456","会在24小时内返还到您的微信内！详情请咨询400-800135","点击申请退款，并填写合理的理由！详情请咨询400-800467"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var id=options.id
       console.log(id)
       this.setData({id})
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