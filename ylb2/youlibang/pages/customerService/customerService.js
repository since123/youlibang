// pages/customerService/customerService.js
var serviceid;
var serviceTel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infolist: [
      { serviceid:0, serviceTel: '020-23787989', kefuNum: '客服003'},
      { serviceid:1, serviceTel: '020-22324349', kefuNum: '客服005'}
      ],
    // frame: [{
    //   "tel": "15674902565"
    // }],
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that=this;
    // wx.request({
    //   url: '', //仅为示例，并非真实的接口地址
    //   data: {
    //     serviceid:[],
    //     serviceTel: '',
    //     kefuNum: ''
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
  },
  //点击拨打电话
  customer:function(e){
    var that=this;
    console.log(e)
    var serviceId = e.currentTarget.dataset.serviceid;
    // var serviceTel = e.currentTarget.dataset.serviceTel;
    wx.makePhoneCall({
      phoneNumber: serviceId 
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