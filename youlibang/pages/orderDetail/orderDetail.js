// pages/orderDetail/orderDetail.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '李开心',
    phoneNumber: '13260995055',
    adress: '广东省广州市天河区汇诚大厦365',
    token: '',
    orderId: '',
    order: [
      {
        goodsImg: '../../images/2012031220134655.jpg',
        goodsdetail: '新款韩版秋装女初恋裙白色复古压褶雪纺长袖连衣裙a字中长裙',
        types: '粉色、M',
        num: 'X2件'
      },{
        goodsImg: '../../images/2012031220134655.jpg',
        goodsdetail: '新款韩版秋装女初恋裙白色复古压褶雪纺长袖连衣裙a字中长裙',
        types: '粉色、M',
        num: 'X2件'
      },
      {
        goodsImg: '../../images/2012031220134655.jpg',
        goodsdetail: '新款韩版秋装女初恋裙白色复古压褶雪纺长袖连衣裙a字中长裙',
        types: '粉色、M',
        num: 'X2件'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    // console.log("options: " + option.orderId)//7777
    let orderId = option.orderId
    this.setData({
      token: wx.getStorageSync('token'),
      orderId: orderId
    })
    // this.getOrder(orderId)
  },
  getOrder: function (orderId) {
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/oddetail?token=' + this.data.token + '&order_sn=' + this.data.orderId,
    }).then((res) => {
      console.log(res)
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