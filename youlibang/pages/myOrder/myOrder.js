// pages/myOrder/myOrder.js
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
    currtab: 0,
    swipertab: [{ name: '全部', index: 0 }, { name: '待付款', index: 1 }, { name: '待发货', index: 2 }, { name: '待收货', index: 3 }, { name: '已完成', index: 4 }],
    height: 0,
    number: 0,
    sum: 0,
    orderSumPri: [],
    allOrderS: [],
    waitPayOrder: [],
    waitSentOrder: [],
    waitReceivedOrder: [],
    completeOrder: []
  },
  /**
   * 请求数据
   */
  getGoods: function () {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/getorder',
    }).then((res) => {
      // console.log(res.data)
      let lists = res.data.lists
      // console.log(lists)
      //数据重组
      let orders = []
      let waitPayOrder = []
      let waitSentOrder = []
      let waitReceivedOrder = []
      let completeOrder = []
      for (let m in lists) {
        // console.log(lists)
        let ss = {}
        let goods = []
        ss.orderId = m
        for (let n in lists[m]) {
          let mm = {}
          let pay_status = ""
          let send_status = ""
          if (n != "pay_status") {
            // console.log(lists[m][n])
            // if (lists[m][n].pay_status == )
            pay_status = lists[m][n].pay_status
            // ss.status = 
          }
          if (lists[m][n].hasOwnProperty('goods_logo')) {
            mm.image = lists[m][n].goods_logo
          }
          if (lists[m][n].hasOwnProperty('goods_name')) {
            mm.title = lists[m][n].goods_name
          }
          if (lists[m][n].hasOwnProperty('goods_attr_ids')){
            mm.properties = lists[m][n].goods_attr_ids
          }
          if (lists[m][n].hasOwnProperty('goods_price')) {
            mm.price = lists[m][n].goods_price
          }
          if (lists[m][n].hasOwnProperty('number')) {
            mm.number = lists[m][n].number
          }
          if (lists[m][n].hasOwnProperty('courier_status')) {
            send_status = lists[m][n].courier_status.send_type
            if (pay_status == "1" && send_status == "0") {
              ss.status = "待发货"
            } else if (pay_status == "1" && send_status == "1") {
              ss.status = "待收货"
            } else if (pay_status == "1" && send_status == "2") {
              ss.status = "已完成"
            } else {
              ss.status = "待付款"
            }
            // console.log(lists[m][n].courier_status.send_type)
            // mm.status = lists[m][n][courier_number].send_type
          }
          goods.push(mm)
          ss.goods = goods
          // console.log(ss.status)
          
          // console.log(ss.goods)
        }
        // console.log(goods)
        if (ss.status == "待付款") {
          waitPayOrder.push(ss)
        }
        if (ss.status == "待发货") {
          waitSentOrder.push(ss)
        }
        if (ss.status == "待收货") {
          waitReceivedOrder.push(ss)
        }
        if (ss.status == "已完成") {
          completeOrder.push(ss)
        }
        completeOrder
        orders.push(ss)
      }
      // console.log(orders)
      // console.log(that)
      that.setData({
        allOrderS: orders,
        waitPayOrder: waitPayOrder,
        waitSentOrder: waitSentOrder,
        waitReceivedOrder: waitReceivedOrder,
        completeOrder: completeOrder
      })
      that.orderShow()
      // console.log(this.data.allOrderS)//有数据
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.getGoods()
    let tab = option.currtab
    this.setData({
      currtab: tab
    })
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getGoods()
    // console.log(this.data.allOrderS);
    this.getDeviceInfo()
    this.orderShow()
  },
  /*
  * 设置swiper高度
   */
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
  /**
   * @Explain：选项卡点击切换
   */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      let tab = e.target.dataset.current
      that.setData({
        currtab: tab
      })
    }
  },
  /**
 * 滑动切换页面
 */
  onTabChange: function (e) {
    var that = this
    let tab = e.detail.current
    that.setData({
      currtab: tab
    })
    this.orderShow()
  },
  /**
   * 显示页面
   */
  orderShow: function () {
    let that = this
    // console.log("Number(this.data.currtab) " + Number(this.data.currtab))
    switch (Number(this.data.currtab)) {
      case 0: that.allOrderShow()
        break;
      case 1:
        // console.log("waitPayShow")
      that.waitPayShow()
        break;
      case 2: that.waitSentShow()
        break;
      case 3: that.waitReceivedShow()
        break;
      case 4: that.completeShow()
        break;
    }
  },
  /**
   * 显示全部订单
   */
  allOrderShow: function () {
    let array = []
    for (let i = 0; i < this.data.allOrderS.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      let orderHandleOne = ''
      let orderHandleTwo = ''
      // console.log(this.data.allOrderS[i].goods)
      for (let j = 0; j < this.data.allOrderS[i].goods.length; j++) {
        let goodsPrice = parseFloat(this.data.allOrderS[i].goods[j].price)
        let goodsNumber = parseFloat(this.data.allOrderS[i].goods[j].number)
        sumPrice += goodsPrice * goodsNumber
        sumNumber += goodsNumber
        
      }
      if (this.data.allOrderS[i].status == '待付款'){
        orderHandleOne = '取消订单'
        orderHandleTwo = '确认付款'
      }
      else if (this.data.allOrderS[i].status == '待发货'){
        orderHandleOne = '取消订单'
        orderHandleTwo = '催TA发货'
      }
      else {
        orderHandleOne = '申请退款'
        orderHandleTwo = '确认收货'
      }

      array.push(
        Object.assign({}, this.data.allOrderS[i], { totalNumber: sumNumber, totalPrice: sumPrice, orderHandleOne: orderHandleOne, orderHandleTwo: orderHandleTwo})
      )
    }
    this.setData({
      allOrderS: array
    })
  },
  /**
   * 显示待付款页面
   */
  waitPayShow: function () {
    let array = []
    for (let i = 0; i < this.data.waitPayOrder.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      for (let j = 0; j < this.data.waitPayOrder[i].goods.length; j++) {
        let goodsPrice = parseFloat(this.data.waitPayOrder[i].goods[j].price)
        let goodsNumber = parseFloat(this.data.waitPayOrder[i].goods[j].number)
        sumPrice += goodsPrice * goodsNumber
        sumNumber += goodsNumber
      }

      array.push(
        Object.assign({}, this.data.waitPayOrder[i], { totalNumber: sumNumber, totalPrice: sumPrice })
      )
    }
    this.setData({
      waitPayOrder: array
    })
  },
  /**
   * 显示待发货页面
   */
  waitSentShow: function () {
    let array = []
    for (let i = 0; i < this.data.waitSentOrder.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      for (let j = 0; j < this.data.waitSentOrder[i].goods.length; j++) {
        let goodsPrice = parseFloat(this.data.waitSentOrder[i].goods[j].price)
        let goodsNumber = parseFloat(this.data.waitSentOrder[i].goods[j].number)
        sumPrice += goodsPrice * goodsNumber
        sumNumber += goodsNumber
      }

      array.push(
        Object.assign({}, this.data.waitSentOrder[i], { totalNumber: sumNumber, totalPrice: sumPrice })
      )
    }
    this.setData({
      waitSentOrder: array
    })
  },
  /**
   * 显示待收货页面
   */
  waitReceivedShow: function () {
    let array = []
    for (let i = 0; i < this.data.waitReceivedOrder.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      for (let j = 0; j < this.data.waitReceivedOrder[i].goods.length; j++) {
        let goodsPrice = parseFloat(this.data.waitReceivedOrder[i].goods[j].price)
        let goodsNumber = parseFloat(this.data.waitReceivedOrder[i].goods[j].number)
        sumPrice += goodsPrice * goodsNumber
        sumNumber += goodsNumber
      }

      array.push(
        Object.assign({}, this.data.waitReceivedOrder[i], { totalNumber: sumNumber, totalPrice: sumPrice })
      )
    }
    this.setData({
      waitReceivedOrder: array
    })
  },
  /**
   * 显示已完成页面
   */
  completeShow: function () {
    let array = []
    for (let i = 0; i < this.data.completeOrder.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      for (let j = 0; j < this.data.completeOrder[i].goods.length; j++) {
        let goodsPrice = parseFloat(this.data.completeOrder[i].goods[j].price)
        let goodsNumber = parseFloat(this.data.completeOrder[i].goods[j].number)
        sumPrice += goodsPrice * goodsNumber
        sumNumber += goodsNumber
      }

      array.push(
        Object.assign({}, this.data.completeOrder[i], { totalNumber: sumNumber, totalPrice: sumPrice })
      )
    }
    this.setData({
      completeOrder: array
    })
  },
  orderDetailShow: function(e) {
    // console.log(e.currentTarget.dataset.orderid)
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId='+ orderid
    })
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