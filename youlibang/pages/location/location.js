// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  currentsite(){
    wx.getLocation({
      success: function(res) {
        var lat = res.latitude
        var lon=res.longitude
        //将经纬度提交后端，请求后端接口

       var address="湖北省武汉市洪山区"
     
       wx.redirectTo({
         url: '../personal_data/personal_data?address=' + address,
       })
      },
    })
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