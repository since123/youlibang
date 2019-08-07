// pages/mine/mine.js
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
    userInfo:[],
    vipid: '',
    openid: '',
    username:'蜡笔小新',
    vipid:'0123',
    userImg_url:'../../images/headImg.png',
    price:'188.00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    let openid = wx.getStorageSync('openid')
    if (openid) {
      if (app.globalData.vipid) {
        this.setData({
          vipid: app.globalData.vipid,
          openid: openid
        })
        this.getVipUserInfo()
      } else {
        if (app.globalData.userInfo) {
          this.setData({
            userInfo: app.globalData.userInfo
          })
          this.getPersonalInfo()
        } else {
          console.log("获取个人信息失败")
        }
      }
    } else {
      console.log("openid获取失败")
    } 
    //如果不是注册的会员就显示自己的微信信息,此处需要加判断
    // this.getVipUserInfo()//如果是会员时，后台返回数据，展示会员信息
  },
  /**是会员时，后台返回数据，展示会员信息 */
  getVipUserInfo: function() {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/getdetail?user_id=2',
    }).then((res) => {
      console.log(res.data.lists);
        let list = res.data.lists
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数 　　　　
          // logs: res.data.result,
          vipid: list.member_id,
          username: list.nickname,
          userImg_url: list.avatar,
          price: list.balance
        })
        // this.userData = res.data; //无效不能实时的渲染到页面
        // that.setData({ userData: res.data });//和页面进行绑定可以动态的渲染到页
    })
  },
  /**
   * 获取页面数据（普通用户信息）
   */
  getPersonalInfo:function() {
    var that = this;
    
    let nickName = this.data.userInfo.nickName
    let src = this.data.userInfo.avatarUrl
    // let sex = this.data.userInfo.gender //性别 0：未知、1：男、2：女
    //此处需要加个判断，如果是会员则vipname = nickName,先默认昵称为会员名
    //success
    // console.log(sex)
    that.setData({
      username: nickName,
      userImg_url: src
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
      url: '../myOrder/myOrder?currtab=0',
    })
  },
  waitPay: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=1',
    })
  },
  waitSent: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=2',
    })
  },
  waitReceived: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=3',
    })
  },
  completed: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=4',
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