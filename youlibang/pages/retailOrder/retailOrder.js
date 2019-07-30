// pages/retailOrder/retailOrder.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    swipertab: [{ name: '全部', index: 0 }, { name: '待付款', index: 1 }, { name: '待发货', index: 2 }, { name: '待收货', index: 3 }, { name: '已完成', index: 4 }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.showOrderPages()
  },
  
  /**
   * 分销详情页面
   */
  retailOrderDetail: function(){
    wx.navigateTo({
      url: '../retail_orderdetail/retail_orderdetail',
    })
  },
  showOrderPages: function() {
    console.log(this.data.currentTab)
    let that = this
    switch (Number(this.data.currentTab)) {
      case 0 : that.getAllRetailOrder()
      break;
      case 1 : that.getWaitPayOrder()
      break;
      case 2 : that.getWaitSendOrder()
      break;
      case 3 : that.getWaitReceived()
      break;
      case 4 : that.getcompleteOrder()
    }
    },
  /**
   * 全部
   */
  getAllRetailOrder: function () {
    console.log("allRetailOrder")
    this.setData({
      allRetailOrder:[
        {
          status:"未付款",
          image: "../../images/headImg.png",
          userName: "张三",
          userGrade: "一级",
          money: "25"
      },{
          status: "已付款",
          image: "../../images/headImg.png",
          userName: "张四",
          userGrade: "二级",
          money: "25"
      }
    ]
    })
    console.log(this.data.status)
  },
  /**
   * 待付款
   */
  getWaitPayOrder: function () {
    this.setData({
      waitPayOrder: [
        {
          status: "待付款",
          image: "../../images/headImg.png",
          userName: "张三",
          userGrade: "一级",
          money: "25"
        }, {
          status: "待付款",
          image: "../../images/headImg.png",
          userName: "张四",
          userGrade: "二级",
          money: "25"
        }
      ]
    })
  },
  /**
   * 待发货
   */
  getWaitSendOrder: function () {
    this.setData({
      waitSendOrder: [
        {
          status: "待发货",
          image: "../../images/headImg.png",
          userName: "张三",
          userGrade: "一级",
          money: "25"
        }, {
          status: "待发货",
          image: "../../images/headImg.png",
          userName: "张四",
          userGrade: "二级",
          money: "25"
        }
      ]
    })
  },
  /**
   * 待收货
   */
  getWaitReceived: function ()  {
    this.setData({
      waitReceived: [
        {
          status: "待收货",
          image: "../../images/headImg.png",
          userName: "张三",
          userGrade: "一级",
          money: "25"
        }, {
          status: "待收货",
          image: "../../images/headImg.png",
          userName: "张四",
          userGrade: "二级",
          money: "25"
        }
      ]
    })
  },
  /**
   * 已完成
   */
  getcompleteOrder: function () {
    this.setData({
      completeOrder: [
        {
          status: "已完成",
          image: "../../images/headImg.png",
          userName: "张三",
          userGrade: "一级",
          money: "25"
        }, {
          status: "已完成",
          image: "../../images/headImg.png",
          userName: "张四",
          userGrade: "二级",
          money: "25"
        }
      ]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDeviceInfo()
    this.showOrderPages()
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