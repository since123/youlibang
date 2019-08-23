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
    userName: '',
    phoneNumber: '',
    address: '',
    token: '',
    orderid: '',
    orderAmount: '',
    freightStatus: '20',
    order: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log("options: " + option.orderid)//7777
    let orderid = option.orderid
    this.setData({
      token: wx.getStorageSync('token'),
      orderid: orderid
    })
    this.getOrder()
  },
  getOrder: function () {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/oddetail?token=' + this.data.token + '&order_id=' + this.data.orderid,
    }).then((res) => {
      console.log(res)
      let goodsList = res.data.lists
      let orderAmount = goodsList[0].order_amount
      let userName = goodsList[0].address_name
      let phoneNumber = goodsList[0].address_phone
      let address = goodsList[0].address
      //console.log(orderAmount)
      let order = []
      for (let m in goodsList) {
        console.log(goodsList[m])
        let good = {}
        good.goodsImg = goodsList[m].goods_logo,
        good.goodsdetail = goodsList[m].goods_name,
        good.types = goodsList[m].goods_attr_values,
        good.num = goodsList[m].number
        order.push(good)
      }
      that.setData({
        order : order,
        orderAmount : orderAmount,
        userName : userName,
        phoneNumber: phoneNumber,
        address: address
      })
    }
    )
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