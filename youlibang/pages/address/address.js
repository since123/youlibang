// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkname:'',
    region: ['广东省', '广州市', '海珠区'], // 初始值
    customItem: '全部'
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
  //输入地址
  bindRegionChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region:e.detail.value
    });

  },

  saveAddress: function (e) {
    console.log(e);
    var that=this;
    var linkname=e.detail.value.linkname;
    var moblie=e.detail.value.moblie;
    var addressdetail = e.detail.value.addressdetail;
    var region = e.detail.value.region;
    if (linkname==''){
      wx.showToast({
        title: '提示',
        content:'请填写联系人姓名',
        showCancel:false
      })
      return
    }
    if(moblie==''){
      wxx.showToast({
        title:'提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    wx.request({
      url: '',
      data:{
        linkname:linkname,
        moblie:moblie,
        addressdetail:addressdetail,
        region:region,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
      }

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.request({
    //   url: '', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })

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