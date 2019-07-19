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
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.orderShow()
    function get_wxml(className, callback) {
      wx.createSelectorQuery().select(className).boundingClientRect(callback).exec()
    }
    get_wxml('.container-0', rect => {
      const height = rect.height
      this.setData({ height:  height })
    })
  },
  /**
    * @Explain：选项卡点击切换
    */
  tabSwitch: function(e) {
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

  onTabChange: function(e) {
    var that = this
    function get_wxml(className, callback) {
      wx.createSelectorQuery().select(className).boundingClientRect(callback).exec()
    }
    let tab = e.detail.current
    that.setData({
      currtab: tab
    })
    this.orderShow()
    get_wxml('.container-' + tab, rect => {
      const height = rect.height
      that.setData({
        height: height,
      })
    })
  },
  orderShow: function() {
    let that = this
    switch(this.data.currtab){
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
    // console.log(this.data.allOrderS[1].orders.length)
    let array = []
    for (let i=0; i<this.data.allOrderS.length; i++){
      let sumPrice  = 0
      let sumNumber = 0
      for (let j=0; j<this.data.allOrderS[i].orders.length; j++){
        let goodsPrice =  parseFloat(this.data.allOrderS[i].orders[j].price)
        let goodsNumber =  parseFloat(this.data.allOrderS[i].orders[j].number)
        sumPrice += goodsPrice * goodsNumber 
        sumNumber += goodsNumber
      }

      array.push(
        Object.assign({}, this.data.allOrderS[i], { totalNumber: sumNumber, totalPrice: sumPrice })
      )
      console.log(sumPrice)
      console.log(sumNumber)
    }
    this.setData({
      allOrderS: array
    })
  },

  waitPayShow: function (){
    this.setData({
      waitPayOrder: [{
        orderId: '001',
        storeName: 'storeName',
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
  },
  waitSentShow: function (){
    this.setData({
      waitSentOrder: [{
        orderId: '001',
        storeName: 'storeName',
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
  },
  waitReceivedShow: function () {
    this.setData({
      waitReceivedOrder: [{
        orderId: '001',
        storeName: 'storeName',
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
    })},
  completeShow: function (){
    this.setData({
      completeOrder: [{
        orderId: '001',
        storeName: 'storeName',
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