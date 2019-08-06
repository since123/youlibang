// pages/submitOrder/submitOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data=options.info
    data=JSON.parse(data)
    console.log(data)
    var total=data[0].price
    this.setData({
      price:total,
      goodsInfo:data

    })
  },
  payway(){
     console.log("通过微信支付！")
      this.setData({
        way:"微信"
      })
  },
  payWay(){
    console.log("通过钱包支付！")
     this.setData({
       way:"钱包"
     })
    
  },
  confirm(){
   
    var way=this.data.way
    //判断支付方式
    if(way=="微信"){
       //调取微信支付接口
       console.log("微信支付！")
    }else{
       //从本地存储中将余额拿出来
      //采用钱包余额支付
      try {
        var yue = wx.getStorageSync('yue')
        if (yue) {
          var price = this.data.price
          //判断余额是否可以购买
          if(yue<price){
            wx.showToast({
              title: '亲，余额不足哦，请立即充值！',
            })
          }else{
            wx.showToast({
              title: '购买成功！',
            })
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
   

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