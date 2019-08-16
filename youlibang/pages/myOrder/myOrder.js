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
    allOrderS: [],
    waitPayOrder: [],
    waitSentOrder: [],
    waitReceivedOrder: [],
    completeOrder: [],
    token: '',
    vipid: '',
    ifhiddenone: true,
    ifhiddentwo: false
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
      url: ApiUrl.phplist + 'order/getorder?token=' + this.data.token + '&member_id=' + this.data.vipid,
    }).then((res) => {
      console.log(res.data)
      let lists = res.data.lists
      console.log(lists)
      //数据重组
      let orders = []
      let waitPayOrder = []
      let waitSentOrder = []
      let waitReceivedOrder = []
      let completeOrder = []
      for (let m in lists) {
        let ss = {}
        let goods = []
        ss.orderid = lists[m].order_sn
        ss.totalNumber = Number(lists[m].pay_num)
        ss.totalPrice = Number(lists[m].order_amount)
        if (lists[m].pay_status == '0') {
          ss.status = "待付款"
          ss.orderHandleOne = '取消订单'
          ss.orderHandleTwo = '确认付款'
          ss.orderMethodOne = 'cancelOrder'
          ss.orderMethosTwo = 'confirmPay'
        }
        else if (lists[m].pay_status == '1') { 
          ss.status = "已取消"
          ss.ifhiddenone = true,
          ss.ifhiddentwo = true
        }
        else if (lists[m].pay_status == '2') { 
          ss.status = "待发货"
          ss.orderHandleOne = '催TA发货'
          ss.orderHandleTwo = '申请退款'
          ss.orderMethodOne = 'urgeDeliver'
          ss.orderMethosTwo = 'applyRefund'
        }
        else if (lists[m].pay_status == '3') {
          ss.status = "待收货"
          ss.orderHandleOne = '申请退款'
          ss.orderHandleTwo = '确认收货'
          ss.orderMethodOne = 'applyRefund'
          ss.orderMethosTwo = 'confirmReceipt'
         }
        else { 
          ss.status = "已完成"
          ss.orderHandleTwo = '删除订单'
          ss.ifhiddenone = true
          ss.orderMethosTwo = 'deleteOrder'
          }
        for (let n in lists[m].goods) {
           let mm = {}
          // console.log(lists[m].goods[n])
          if (lists[m].goods[n].hasOwnProperty('goods_logo')) {
            mm.image = lists[m].goods[n].goods_logo
          }
          if (lists[m].goods[n].hasOwnProperty('goods_name')) {
            mm.title = lists[m].goods[n].goods_name
          }
          if (lists[m].goods[n].hasOwnProperty('goods_price')) {
            mm.price = lists[m].goods[n].goods_price
          }
          if (lists[m].goods[n].hasOwnProperty('number')) {
            mm.number = lists[m].goods[n].number
          } 
          
          goods.push(mm)
          ss.goods = goods
        }
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
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let token = wx.getStorageSync('token')
    let vipid = wx.getStorageSync('vipid')
    this.setData({
      token: token,
      vipid: vipid
    })
    this.getGoods()
    if (option.currtab == null || option.currtab == '') {
      option.currtab = 0
    } else {
      let tab = option.currtab
      this.setData({
        currtab: tab
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDeviceInfo()
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
    let tab = e.target.dataset.current
    if (this.data.currtab === tab) {
      return false
    } else {
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
  },
  /**
   * 订单详情
   */
  orderDetailShow: function(e) {
    // console.log(e.currentTarget.dataset.orderid)
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderid=' + orderid
    })
  },
  /**
   * 申请退款
   */
  applyRefund: function(e) {
    console.log(e.currentTarget.dataset.orderid)
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../applyRefund/applyRefund',
    })
  },
  /**
   * 催他发货
   */
  urgeDeliver: function(e) {
    let orderid = e.currentTarget.dataset.orderid
    console.log('催他发货')
    
  },
  /**
   * 取消订单
   */
  cancelOrder: function(e) {
    let orderid = e.currentTarget.dataset.orderid
    console.log('取消订单')
  },
  /**
   * 确认付款
   */
  confirmPay: function(e) {
    let orderid = e.currentTarget.dataset.orderid
    console.log('确认付款')
  },
  /**
   * 删除订单
   */
  deleteOrder: function(e) {
    let orderid = e.currentTarget.dataset.orderid
    console.log('删除订单')
  },
  /**
   * 确认收货
   */
 confirmReceipt: function(e) {
   let orderid = e.currentTarget.dataset.orderid
   console.log('确认收货')
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