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
    ifhiddentwo: false,
    status: false,
    ifPassword: true,
    payway: '',
    modalHidden: true,
    ifcancel: true,
    payStatus: true,
    orderid: '',
    password: '',
    ifxianxia: true,
    ifRefund: true,
    refundremark: '',
    ifReceipt: true,
  },
  /**
   * 请求数据
   */
  getGoods: function () {
    console.log('load')
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
        ss.orderSn = lists[m].order_sn
        ss.orderid = lists[m].id
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
          ss.orderHandleTwo = '删除订单'
          ss.ifhiddenone = true
          ss.orderMethosTwo = 'deleteOrder'
        }
        else if (lists[m].pay_status == '2') { 
          ss.status = "待发货"
          ss.orderHandleTwo = '申请退款'
          ss.ifhiddenone = true
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
        //completeOrder
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
    let tab = (option && option.currtab) || 0
    this.setData({
      currtab: tab
    })
    this.getGoods()
    // //let currtab = option.currtab
    // if (!option.currtab) {
    //   option.currtab = 0
    // }
    
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
    //console.log(e.currentTarget.dataset.orderid)
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderid=' + orderid
    })
  },
  /**
   * 申请退款
   */
  applyRefund: function(e) {
    let orderid = e.currentTarget.dataset.orderid
    this.setData({
      ifRefund: false,
      orderid: orderid
    })
    console.log(this.data.ifRefund)
    //console.log('退款订单')
  },
  //填写退款原因
  getReason: function(e) {
    let refundremark = e.detail.value
    this.setData({
      refundremark: refundremark
    })
  },
  //确认退款
  refundconfirm: function () {
    let that = this
    this.setData({
      // status: !status,
      ifRefund: true
    })
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/tuikuan?token=' + this.data.token + '&member_id=' + wx.getStorageSync('vipid') + '&order_id=' + this.data.orderid + '&or_remark=' + this.data.refundremark,
    }).then((res) => {
      //console.log(res)
      let status = res.data.lists
      if (status) {
        that.onLoad()
      }else{
        wx.showModal({
          title: '内部错误',
          content: '接口数据错误',
        })
      }
    })
    
  },
  //取消退款订单
  refundcancel: function () {
    this.setData({
      ifRefund: true
    })
  },
  /**
  * 取消订单
  */
  cancelOrder: function (e) {
    let orderid = e.currentTarget.dataset.orderid
    this.setData({
      ifcancel: false,
      orderid: orderid
    })
    console.log(this.data.ifcancel)
    //console.log('删除订单')

  },
  //确认取消
  cancelOrderconfirm: function () {
    let that = this
    this.setData({
      // status: !status,
      ifcancel: true
    })
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/delOrder?token=' + this.data.token + '&member_id=' + wx.getStorageSync('vipid') + '&order_id=' + this.data.orderid
    }).then((res) => {
      console.log(res)
      let status = res.data.lists
      if (status) {
        that.onLoad()
        console.log('1')
      }else{
        wx.showModal({
          title: '内部错误',
          content: '接口数据错误',
        })
      }
    })
  },
  //取消取消订单
  cancelOrdercancel: function () {
    this.setData({
      ifcancel: true
    })
  },
  //点击确认付款弹出选择付款方式页面
  confirmPay:function(e) {
    let orderid = e.currentTarget.dataset.orderid
    var status = this.data.status;
    console.log(status)
    status = !status;
    this.setData({
      status: status,
      payStatus: false,
      orderid: orderid
    })　
  },
  /**
   * 确认微信付款
   */
  confirmWeixinPay: function(e) {
    var that = this;
    var token = wx.getStorageSync("token")
    console.log(that.data.orderid)
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/orderpay?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid') + '&pay_type=' + that.data.payway + '&order_id=' + that.data.orderid,
      // url: ApiUrl.phplist + 'order/orderpay?pay_amount=' + this.data.amount,
    }).then((res) => {
      //console.log(res)
      wx.requestPayment({
        timeStamp: res.data.lists.timeStamp,
        nonceStr: res.data.lists.nonceStr,
        package: res.data.lists.package,
        signType: 'MD5',
        paySign: res.data.lists.paySign,
        success: function (res) {
          that.onLoad()
          console.log('1')
          that.setData({
            status: false,
            payStatus: true
          })
        },
        fail: function (res) {
          wx.showModal({
            title: '内部错误',
            content: '接口数据错误',
          })
        },
        complete: function (res) {
          // complete
          that.setData({
            status: false,
            payStatus: true
          })

        }
      })
    })
  },
  
  /**
   * 删除订单
   */
  deleteOrder: function(e) {
    let orderid = e.currentTarget.dataset.orderid
    this.setData({
      modalHidden: false,
      orderid: orderid
    })
    console.log(this.data.modalHidden)
    //console.log('删除订单')
    
  },
  //确认删除
  modalBindaconfirm: function() {
    let that = this
    this.setData({
      // status: !status,
      modalHidden: true
    })
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/delOrder?token=' + this.data.token + '&member_id=' + wx.getStorageSync('vipid') + '&order_id=' + this.data.orderid
    }).then((res) => {
      console.log(res)
      let status = res.data.lists
      if (status){
        that.onLoad()
        //console.log('1')
      }else{
        wx.showModal({
          title: '内部错误',
          content: '接口数据错误',
        })
      }
    })
   
  },
  //取消删除
  modalBindcancel: function() {
    this.setData({
      modalHidden: true
    })
  },
  /**
   * 确认收货
   */
 confirmReceipt: function(e) {
   let orderid = e.currentTarget.dataset.orderid
   this.setData({
     ifReceipt: false,
     orderid: orderid
   })
   console.log(this.data.ifReceipt)
   //console.log('确认收货')
 },
 //确认收货
  receiptconfirm: function() {
    let that = this
    console.log(wx.getStorageSync('vipid'))
    console.log(this.data.orderid)
    
    this.setData({
      // status: !status,
      ifReceipt: true
    })
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/confirmOrder?token=' + this.data.token + '&member_id=' + wx.getStorageSync('vipid') + '&order_id=' + that.data.orderid
    }).then((res) => {
      console.log(res)
      let status = res.data.lists
      if (status) {
        that.onLoad()
        console.log('1')
      } else {
        wx.showModal({
          title: '内部错误',
          content: '接口数据错误',
        })
      }
    })

  },
  //取消收货
  receiptcancel: function () {
    this.setData({
      ifReceipt: true
    })
  },
  //控制隐藏
  ifhidden: function () {
    ifhidden: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //ifxianxia: true
  //选择支付方式
  payway(e) {
    let that = this
    let payway = e.detail.value
    if (payway == 'qianbao') {
      that.setData({
        ifPassword: false,
      })
    } else if (payway == 'xianxia'){
      that.setData({
        ifxianxia: false,
        ifPassword: true,
        payStatus: true
      })
    } else if (payway == 'wxpay'){
      ifPassword: true
    }
    this.setData({
      payway: payway
    })
    console.log(that.data.payway)
  },

  cancelPay: function () {
    var status = this.data.status;
    status = !status;
    this.setData({
      status: status,
      ifPassword: true,
      payStatus: true,
      modalHidden: true,
      ifcancel: true,
    })
  },
  //确认支付
  selectPayWay: function () {
    let that = this
    console.log(that.data.payway)
    if (that.data.payway == 'wxpay') {
      that.confirmWeixinPay()
    } else if (that.data.payway == 'qianbao'){
      that.confirmQianbaoPay()
    }
    else {
      that.confirmXianxiaPay()
    }
  },
  //钱包付款
  confirmQianbaoPay: function() {
    let that = this
    console.log(that.data.payway)
    
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/orderpay?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid') + '&pay_type=' + that.data.payway + '&order_id=' + that.data.orderid,
    }).then((res) =>{
      console.log(res)
      if (res.data.code == 10001) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '支付成功',
        })
      }
    })
  },
  //获得输入的密码
  getpassword: function(e) {
    let password = e.detail.value
    this.setData({
      password: password,
    })
  },
  //确认密码
  confirmPas: function(){
    let that = this
    let password = this.data.password
    console.log(password)
    
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/confirmPsw?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid') + '&psw=' + password,
    }).then((res) => {
      console.log(res)
      //成功
      let status = res.data.lists
      if (status) {
        that.setData({
          ifPassword: true
        })
        wx.showModal({
          title: '提示！',
          content: '密码正确',
        })
      } else {
      // 密码错误
       wx.showModal({
         title: '提示！',
         content: '密码错误',
       })
      }
    })
  },
  //线下付款
  confirmXianxiaPay: function() {
    this.setData({
      ifxianxia: false,
      payStatus: true,
      status: false
    })
  },

  //取消线下支付
  xianxiacancel: function () {
    this.setData({
      ifxianxia: true,
      payStatus: true,
      status: false
    })
  },
  //确认看到线下支付的回执
  xianxiaconfirm: function () {
    this.setData({
      ifxianxia: true,
      payStatus: true,
      status: false
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