// pages/retailOrder/retailOrder.js
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
    currentTab: 0,
    swipertab: [{ name: '全部', index: 0 }, { name: '待付款', index: 1 }, { name: '待发货', index: 2 }, { name: '待收货', index: 3 }, { name: '已完成', index: 4 }],
    allRetailOrder: [],
    waitPayOrder: [],
    waitSendOrder: [],
    waitReceivedOrder: [],
    orderid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let app = getApp()
    let token = wx.getStorageSync('token')

      httpReq({
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        url: ApiUrl.phplist + 'distribution/getall?token' + token,
      }).then((res) => {
        console.log(res.data.lists)
        let retailOrder = res.data.lists
        let allOrder = []
        let waitPayOrder = []
        let waitSentOrder = []
        let waitReceivedOrder = []
        let completeOrder = []
        for(let m in retailOrder) {
          let order = {}
          
          // order.image = retailOrder[m].
          order.userName = retailOrder[m].nickname
          
          if (Number(retailOrder[m].rebate_scale) == 1) {
              order.userGrade = "(一级)"
          } else if (Number(retailOrder[m].rebate_scale) == 2) {
              order.userGrade = "(二级)"
          }
          order.money = Number(retailOrder[m].no_cash)
          order.orderid = Number(retailOrder[m].order_sn)
          //订单状态
          if (Number(retailOrder[m].status) == 0) {
            order.status = '待付款'
            waitPayOrder.push(order)
          } else if (Number(retailOrder[m].status) == 1) {
            order.status = '已取消'
          } else if (Number(retailOrder[m].status) == 2) {
            order.status = '待发货'
            waitSendOrder.push(order)
          } else if (Number(retailOrder[m].status) == 3) {
            order.status = '待收货'
            waitReceivedOrder.push(order)
          } else {
            order.status = '已完成'
            completeOrder.push(order)
          }
          allOrder.push(order)
        }
        that.setData({
          allRetailOrder : allOrder,
          waitPayOrder: waitPayOrder,
          waitSentOrder: waitSentOrder,
          waitReceivedOrder: waitReceivedOrder,
          completeOrder: completeOrder
        })
      })
  },

  /** 
 * 点击tab切换 
 */
  swichNav: function (e) {
    var that = this;
    
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    // this.showOrderPages()
  },
  
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
  bindChange: function (e) {
    let that = this
    
    let tab = e.detail.current
    that.setData({
      currentTab: tab
    })
    // this.showOrderPages()
  },
  
  /**
   * 分销详情页面
   */
  retailOrderDetail: function(e){
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../retail_orderdetail/retail_orderdetail?orderid=' + orderid,
    })
  },
  // showOrderPages: function() {
  //   let that = this
  //   switch (Number(this.data.currentTab)) {
  //     case 0 : that.getAllRetailOrder()
  //     break;
  //     case 1 : that.getWaitPayOrder()
  //     break;
  //     case 2 : that.getWaitSendOrder()
  //     break;
  //     case 3 : that.getWaitReceived()
  //     break;
  //     case 4 : that.getcompleteOrder()
  //   }
  //   },
  /**
   * 全部
   */
  // getAllRetailOrder: function () {
  //   // this.setData({
    //   allRetailOrder:[
    //     {
    //       status:"未付款",
    //       image: "../../images/headImg.png",
    //       userName: "张三",
    //       userGrade: "一级",
    //       money: "25"
    //   },{
    //       status: "已付款",
    //       image: "../../images/headImg.png",
    //       userName: "张四",
    //       userGrade: "二级",
    //       money: "25"
    //   }
    // ]
    // })
  // },
  /**
   * 待付款
   */
  // getWaitPayOrder: function () {
  //   this.setData({
  //     waitPayOrder: [
  //       {
  //         status: "待付款",
  //         image: "../../images/headImg.png",
  //         userName: "张三",
  //         userGrade: "一级",
  //         money: "10"
  //       }, {
  //         status: "待付款",
  //         image: "../../images/headImg.png",
  //         userName: "张四",
  //         userGrade: "二级",
  //         money: "25"
  //       }
  //     ]
  //   })
  // },
  /**
   * 待发货
   */
  // getWaitSendOrder: function () {
  //   this.setData({
  //     waitSendOrder: [
  //       {
  //         status: "待发货",
  //         image: "../../images/headImg.png",
  //         userName: "张三",
  //         userGrade: "一级",
  //         money: "25"
  //       }, {
  //         status: "待发货",
  //         image: "../../images/headImg.png",
  //         userName: "张四",
  //         userGrade: "二级",
  //         money: "25"
  //       }
  //     ]
  //   })
  // },
  /**
   * 待收货
   */
  // getWaitReceived: function ()  {
  //   this.setData({
  //     waitReceived: [
  //       {
  //         status: "待收货",
  //         image: "../../images/headImg.png",
  //         userName: "张三",
  //         userGrade: "一级",
  //         money: "25"
  //       }, {
  //         status: "待收货",
  //         image: "../../images/headImg.png",
  //         userName: "张四",
  //         userGrade: "二级",
  //         money: "25"
  //       }
  //     ]
  //   })
  // },
  /**
   * 已完成
   */
  // getcompleteOrder: function () {
  //   this.setData({
  //     completeOrder: [
  //       {
  //         status: "已完成",
  //         image: "../../images/headImg.png",
  //         userName: "张三",
  //         userGrade: "一级",
  //         money: "25"
  //       }, {
  //         status: "已完成",
  //         image: "../../images/headImg.png",
  //         userName: "张四",
  //         userGrade: "二级",
  //         money: "25"
  //       }
  //     ]
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDeviceInfo()
    // this.showOrderPages()
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