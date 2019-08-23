// pages/retail_orderdetail/retail_orderdetail.js
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
    orderStatus: '',
    freightStatus: '',
    orderRebeat: '',
    order: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    // console.log("options: " + option.orderId)//7777
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
      // url: ApiUrl.phplist + 'order/disOrderDetail?token=' + this.data.token + '&order_sn=' + this.data.orderid,
      url: ApiUrl.phplist + 'order/oddetail?token=' + this.data.token + '&order_id=' + this.data.orderid + '&member_id=' + wx.getStorageSync('vipid'),
    }).then((res) => {
      console.log(res.data.lists)
      let orderRebeat = res.data.lists.rebate
      let goodsList = res.data.lists.or
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
        order: order,
        orderAmount: orderAmount,
        userName: userName,
        phoneNumber: phoneNumber,
        address: address
      })
      // let addressList = res.data.lists.address_list//地址信息
      // let goodsList = res.data.lists.order_goods//订单商品信息
      // //地址内容
      // let userName = addressList.address_name
      // let phoneNumber = addressList.address_phone
      // let address = addressList.address
      // //订单内容
      // let orderAmount = goodsList[0].order_amount//订单总价格
      // let orderStatus = ''//订单状态
      // if (Number(goodsList[0].pay_status) == 0) {
      //   orderStatus = '待付款'
      // } else if (Number(goodsList[0].pay_status) == 1) {
      //   orderStatus = '已取消'
      // } else if (Number(goodsList[0].pay_status) == 2) {
      //   orderStatus = '待发货'
      // } else if (Number(goodsList[0].pay_status) == 3) {
      //   orderStatus = '待收货'
      // } else {
      //   orderStatus = '已完成'
      // }

      // let order = []
      // for (let m in goodsList) {
      //   console.log(goodsList[m])
      //   let good = {}
      //   good.goodsImg = goodsList[m].goods_logo,
      //   good.goodsdetail = goodsList[m].goods_name,
      //   good.types = goodsList[m].goods_attr_values,
      //   good.num = goodsList[m].number
      //   order.push(good)
      // }
      // that.setData({
      //   order: order,
      //   orderAmount: orderAmount,
      //   orderStatus: orderStatus,
      //   userName: userName,
      //   phoneNumber: phoneNumber,
      //   address: address
      // })
      // console.log(orderAmount)
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