// pages/editAddress/editAddress.js
import {
  httpReq
} from '../../utils/http.js';
var addressList = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'], // 省市区初始值
    customItem: '全部',
    linkname:'',//联系人
    moblie:'',//手机号
    addressdetail:'',//详细地址
    index:'',
   arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    var address_id=options.id
    var user_id=options.user_id
   this.setData({
     address_id,
     user_id
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //输入收货人姓名
  listenerReciverInput:function(e){
    console.log(e)
    this.data.linkname=e.detail.value;
  },
  //输入手机号
  listenerPhoneInput:function(e){
    this.data.moblie=e.detail.value;
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
    this.data.addressdetail = e.detail.value;
  },
//保存
  saveBtn: function (e) {
    var that=this;
    if(!this.data.linkname){
      wx.showToast({title: '收货人不能为空'});
      return;
    }
    if (!this.data.moblie) {
      wx.showToast({ title: '手机号不能为空' });
      return;
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test(this.data.moblie)) { 
      wx.showToast({ title: '手机格式有误，请重新输入' }); 
      return; 
    }

    //获取输入的信息
   var address_id=this.data.address_id
    var address_name = this.data.linkname
    var address_phone = this.data.moblie
   var region=this.data.region
    var addressdetail=this.data.addressdetail
    var address=region+addressdetail
    var user_id=this.data.user_id
   //请求编辑接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url:'http://www.ylb.com/api/user/editaddress?address_id='+address_id+'&address_phone='+address_phone+'&address='+address+'&user_id='+user_id,
    }).then((res) => {
        console.log(res)
    });

 wx.navigateTo({
   url: '../myAddress/myAddress',
 })
   
    // wx.request({
    //   url: '',
    //   data: {
    //     // linkname: linkname,
    //     // moblie: moblie,
    //     // addressdetail: addressdetail,
    //     // region: region,
    //     //改为上述编辑过的数据键和值
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data);
    //   }

    // })
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