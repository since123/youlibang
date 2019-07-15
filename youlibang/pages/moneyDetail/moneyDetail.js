// pages/moneyDetail/moneyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-10-01',
    listinfo:[
      {text:'提现-到微信',datetime: '10月9日 00:09:01', money: '2000'},
      {text: '返利',datetime: '10月9日 00:09:01', money: '2000' },
      { text: '消费', datetime: '10月9日 00:09:01', money: '2000' },
      ]
   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeDate:function(e){
    this.setData({ 
      date: e.detail.value 
    });
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