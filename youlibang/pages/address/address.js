// pages/address/address.js
import {
  httpReq
} from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    user_id:'',
    linkname:'',
    region: ['广东省', '广州市', '海珠区'], // 初始值
    customItem: '全部'
  },
  //获取输入的联系人姓名
  linkname(e){
    var linkname=e.detail.value
    this.setData({
      linkname
    })
  },
  //获取输入的手机号
  phone(e){
    var moblie = e.detail.value
    console.log(moblie)
    this.setData({
        moblie
    })
  },
  //获取输入的联系地址
  region(e){
    var region = e.detail.value
    this.setData({
      region
    })
  },
  //获取输入的详细地址
  addressdetail(e){
    var addressdetail = e.detail.value
    this.setData({
      addressdetail
    })
    //console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id=options.user_id
    this.setData({
      user_id
    })
    console.log(user_id)
      // try{
      //   var address=wx.getStorageSync('address')
      //   if(address){
      //      var index=address.length
      //      this.setData({
      //        index
      //      })
      //   }else{
      //      this.setData({
      //        index:0
      //      })
      //   }
      // }catch(e){
         
      // }

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
    //保存新增
  saveAddress: function () {
    var address_name=this.data.linkname
    var address_phone=this.data.moblie
    var address=this.data.region
    var addressdetail=this.data.addressdetail
     var user_id=this.data.user_id
     console.log(user_id)
    if (address_name==''){
      wx.showToast({
        title: '提示',
        content:'请填写联系人姓名',
        showCancel:false
      })
      return
    }
    if (address_phone==''){
      wxx.showToast({
        title:'提示',
        content: '请填写联系人电话',
        showCancel: false
      })
      return
    }
    //验证手机号
    if (!(/^1[3456789]\d{9}$/.test(this.data.moblie))) {
      wx.showToast({ title: '手机格式有误，请重新输入' });
      return;
    }
    address = address+addressdetail
    console.log(address_phone)
   //请求新增接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: 'http://www.ylb.com/api/user/addaddress?user_id='+user_id+'&address_name='+address_name+'&address_phone='+address_phone+'&address='+address,
    }).then((res) => {
        console.log(res)
    });
    wx.navigateTo({
      url: '../myAddress/myAddress',
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