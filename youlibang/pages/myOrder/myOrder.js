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
    allOrderS: []
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
      let lists = res.data
      // console.log(lists)
      //数据重组
      let orders = []

      for (let m in lists) {
        let ss = {}
        let goods = []
        ss.orderId = m
        for (let n in lists[m]) {
          let mm = {}
          if (n != "pay_status") {
            // console.log(lists[m][n])
            ss.status = lists[m][n].pay_status
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
          goods.push(mm)
          ss.goods = goods
          //console.log(goods)
        }

        //  console.log(goods)
        orders.push(ss)
      }
      // console.log(orders)
      // console.log(that)
      that.setData({
        allOrderS: orders
      })
      that.orderShow()
      // console.log(this.data.allOrderS)//有数据
    })
   

    // console.log(this.data)
    // console.log(this.data.swipertab)
    // console.log(this.data.allOrderS)//无数据
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
    // this.orderShow()
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
    // this.orderShow()
  },
  /**
   * 显示页面
   */
  orderShow: function () {
    let that = this
    switch (Number(this.data.currtab)) {
      case 0: that.allOrderShow()
        break;
      case 1: that.waitPayShow()
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
    this.setData({
      waitPayOrder: [{
        orderId: '001',
        storeName: '连衣裙QIJIANDIAN',
        status: '待收货',
        orders:
          [
            {
              index: '0',
              image: '/images/2012031220134655.jpg',
              title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
              color: '黑色',
              size: 'L',
              unit: '件',
              price: '120',
              number: '8'
            }
          ]
      }],
    })
    let array = []
    for (let i = 0; i < this.data.waitPayOrder.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      for (let j = 0; j < this.data.waitPayOrder[i].orders.length; j++) {
        let goodsPrice = parseFloat(this.data.waitPayOrder[i].orders[j].price)
        let goodsNumber = parseFloat(this.data.waitPayOrder[i].orders[j].number)
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
    this.setData({
      waitSentOrder: [{
        orderId: '001',
        storeName: 'Pepe',
        status: '待发货',
        orders:
          [
            {
              index: '0',
              image: '/images/2012031220134655.jpg',
              title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
              color: '黑色',
              size: 'L',
              unit: '件',
              price: '120',
              number: '8'
            },
            {
              index: '1',
              image: '/images/2012031220134655.jpg',
              title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
              color: '黑色',
              size: 'L',
              unit: '件',
              price: '120',
              number: '8'
            }
          ]
      }],
    })
    let array = []
    for (let i = 0; i < this.data.waitSentOrder.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      for (let j = 0; j < this.data.waitSentOrder[i].orders.length; j++) {
        let goodsPrice = parseFloat(this.data.waitSentOrder[i].orders[j].price)
        let goodsNumber = parseFloat(this.data.waitSentOrder[i].orders[j].number)
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
    this.setData({
      waitReceivedOrder: [{
        orderId: '001',
        storeName: 'Pepe Jeans',
        status: '待收货',
        orders:
          [
            {
              index: '0',
              image: '/images/2012031220134655.jpg',
              title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
              color: '黑色',
              size: 'L',
              unit: '件',
              price: '120',
              number: '8'
            },
            {
              index: '1',
              image: '/images/2012031220134655.jpg',
              title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
              color: '黑色',
              size: 'L',
              unit: '件',
              price: '120',
              number: '8'
            }
          ]
      }],
    })
    let array = []
    for (let i = 0; i < this.data.waitReceivedOrder.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      for (let j = 0; j < this.data.waitReceivedOrder[i].orders.length; j++) {
        let goodsPrice = parseFloat(this.data.waitReceivedOrder[i].orders[j].price)
        let goodsNumber = parseFloat(this.data.waitReceivedOrder[i].orders[j].number)
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
    this.setData({
      completeOrder: [{
        orderId: '001',
        storeName: 'Pepe',
        status: '已完成',
        orders:
          [
            {
              index: '0',
              image: '/images/2012031220134655.jpg',
              title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
              color: '黑色',
              size: 'L',
              unit: '件',
              price: '120',
              number: '8'
            },
            {
              index: '1',
              image: '/images/2012031220134655.jpg',
              title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
              color: '黑色',
              size: 'L',
              unit: '件',
              price: '120',
              number: '8'
            }
          ]
      }],
    })
    let array = []
    for (let i = 0; i < this.data.completeOrder.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      for (let j = 0; j < this.data.completeOrder[i].orders.length; j++) {
        let goodsPrice = parseFloat(this.data.completeOrder[i].orders[j].price)
        let goodsNumber = parseFloat(this.data.completeOrder[i].orders[j].number)
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
  orderDetailShow: function() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
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