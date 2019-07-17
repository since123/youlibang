// pages/myOrder/myOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '全部', index: 0 }, { name: '待付款', index: 1 }, { name: '待发货', index: 2 }, { name: '待收货', index: 3 }, { name: '已完成', index: 4 }],
    waitPayOrder: [{ index: '0', image: '/images/2012031220134655.jpg', title: 'Pepe Jeans秋冬新款女士长袖连衣裙', color: '黑色', size: 'L', unit: '件', price: '120', number: '8'}],
    height: 0
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
    function get_wxml(className, callback) {
      wx.createSelectorQuery().select(className).boundingClientRect(callback).exec()
    }

    get_wxml('.container-0', rect => {
      const height = rect.height
      this.setData({ height:  height })
      console.log('height', height)
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
      function get_wxml(className, callback) {
        wx.createSelectorQuery().select(className).boundingClientRect(callback).exec()
      }

      let tab = e.target.dataset.current

      get_wxml('.container-' + tab, rect => {
        const height = rect.height

        that.setData({
          height: height,
          currtab: tab
        })
        console.log('height', height, e.target.dataset.current)
      })


    
    }
  },

  onTabChange(e) {
    console.log('change', e)
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