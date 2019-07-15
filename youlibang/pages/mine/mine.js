// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'蜡笔小新',
    vipid:'0123',
    userImg_url:'../../images/headImg.png',
    price:'188.00'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.userInfo();
    const wxreq = wx.request({
      url: '',
      data: {
        //id:"1",
        //name:'Leanne Graham'
      },
      success: function (res) {
        console.log(res.data);
        // this.userData = res.data; //无效不能实时的渲染到页面
        // that.setData({ userData: res.data });//和页面进行绑定可以动态的渲染到页面

      },
      fail: function (res) {
        console.log(res.data);
        // this.userData = "数据获取失败";
      }
    })
  },
  //获取用户信息
  userInfo:function(){
    var that=this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
        var city = res.userInfo.city
        var country = res.userInfo.country
        var nickName = res.userInfo.nickName
        var province = res.userInfo.province
        that.setData({
          city: city,
          country: country,
          nickName: nickName,
          province: province
        })
      }
    })

  },
  //个人资料
  userinfo:function(){
    wx.navigateTo({
      url: '../personal_data/personal_data',
    })
  },
  //设置
  setbtn:function(){
    wx.navigateTo({
      url: '../set/set'
    })
  },
  //充值
  recharge:function(){
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  //提现
  withdraw: function () {
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  },
  //查看零钱明细
  lookdetail:function(){
    wx.navigateTo({
      url: '../moneyDetail/moneyDetail',
    })
  },
  //查看更多订单
  moreOrder:function(){
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  //地址管理
  address:function(){
    wx.navigateTo({
      url: '../myAddress/myAddress',
    })
  },
  //会员申请
  applyVIP:function(){
    wx.navigateTo({
      url: '../VIPcenter/VIPcenter',
    })
  },
  //优惠卷
  coupon:function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
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