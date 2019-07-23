// pages/myOrder/myOrder.js
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
    orderSumPri: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.orderShow()
    let tab = option.currtab
    this.setData({
      currtab: tab
    })
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
    switch (this.data.currtab) {
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
    this.setData({
      allOrderS: [
        {
          orderId: '001',
          storeName: '美衣旗舰店',
          status: '待付款',
          orders:
            [
              {
                index: '0',
                image: '/images/2012031220134655.jpg',
                title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
                color: '黑色',
                size: 'L',
                unit: '件',
                price: '3',
                number: '1'
              },
              {
                index: '1',
                image: '/images/2012031220134655.jpg',
                title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
                color: '黑色',
                size: 'L',
                unit: '件',
                price: '2',
                number: '1'
              }],
        },
        {
          orderId: '002',
          storeName: '俏韵旗舰店',
          status: '待收货',
          orders: [{
            index: '0',
            image: '/images/2012031220134655.jpg',
            title: 'Pepe Jeans秋冬新款女士长袖连衣裙',
            color: '黑色',
            size: 'L',
            unit: '件',
            price: '6',
            number: '1'
          }],
        }
      ]
    })
    let array = []
    for (let i = 0; i < this.data.allOrderS.length; i++) {
      let sumPrice = 0
      let sumNumber = 0
      let orderHandleOne = ''
      let orderHandleTwo = ''
      for (let j = 0; j < this.data.allOrderS[i].orders.length; j++) {
        let goodsPrice = parseFloat(this.data.allOrderS[i].orders[j].price)
        let goodsNumber = parseFloat(this.data.allOrderS[i].orders[j].number)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.orderShow()
    this.getDeviceInfo()
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