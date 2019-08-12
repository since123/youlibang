// pages/service/service.js
// pages/searchGoods/searchGoods.js
import {
  httpReq
} from '../../utils/http.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtOrderCode: ''
  },
  onlineService:function(){
    wx.navigateTo({
      url: '../onlineService/onlineService',
    })
  },
  customerService:function(){
    wx.navigateTo({
      url: '../customerService/customerService',
    })
  },
  pay: function () {
    var ordercode = this.data.txtOrderCode;
    wx.login({
      success: function (res) {
        if (res.code) {
          httpReq({
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            url: 'http://www.ylb.com/api/wxpay/wx_pay',
          }).then((res) => {
            console.log(res.data)
            console.log(res.data.lists)
            console.log(res.data.lists.timeStamp)
            wx.requestPayment({
              timeStamp: res.data.lists.timeStamp,
              nonceStr: res.data.lists.nonceStr,
              package: res.data.lists.package,
              signType: 'MD5',
              paySign: res.data.lists.paySign,
              success: function (res) {
                // success
                console.log(res);
              },
              fail: function (res) {
                // fail
                console.log(res);
              },
              complete: function (res) {
                // complete
                console.log(res);
              }
            })
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getOrderCode: function (event) {
    this.setData({
      txtOrderCode: event.detail.value
    });
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