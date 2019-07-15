// pages/editAddress/editAddress.js
var addressList = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'], // 省市区初始值
    customItem: '全部',
    consignee:'',//联系人
    mobile:'',//手机号
    address:'',//详细地址
    index:0,
    addressid:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that=this;
    this.setData({
      addressid:options.id
    })
    if(options.id){

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //输入收货人姓名
  listenerReciverInput:function(e){
    this.data.consignee=e.detail.value;
  },
  //输入手机号
  listenerPhoneInput:function(e){
    this.data.mobile=e.detail.value;
  },
  //输入地址
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    });
  },
  //输入详细地址
  listenerAddressInput: function (e) {
    this.data.address = e.detail.value;
  },
//保存
  saveBtn: function (e) {
    console.log(e);
    var that=this;
    if(!this.data.consignee){
      wx.showToast({title: '收货人不能为空'});
      return;
    }
    if (!this.data.mobile) {
      wx.showToast({ title: '手机号不能为空' });
      return;
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test(this.data.mobile)) { 
      wx.showToast({ title: '手机格式有误，请重新输入' }); 
      return; 
    }
    var data={
      consignee:this.data.consignee,
      mobile:this.data.mobile,
      address:this.data.address
    }
 
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