// pages/VIPcenter/VIPcenter.js
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
    dedCommission: '0',
    propRebate: '0',
    unpaidRebate: '0',
    token: '',
    vipid: ''
  },
  //申请会员，注释不能删，有用
  applyVIP:function(){
    wx.navigateTo({
        url: '../applyVIP/applyVIP',
      })
    // if (this.data.vipid){
    //   wx.showModal({
    //     title: '提示',
    //     content: '您已经是会员了，无法再更改会员等级',
    //   })
    // }else {
    //   wx.navigateTo({
    //     url: '../applyVIP/applyVIP',
    //   })
    // }
  },
  //提现
  rebeatWithdraw:function(){
    wx.navigateTo({
      url: '../rebeatWithdraw/rebeatWithdraw',
    })
  },
  //查看返利明细
  lookdetail:function(){
    wx.navigateTo({
      url: '../rebateDetail/rebateDetail',
    })
  },
  //推广二维码
  tuiguang:function(){
    wx.navigateTo({
      url: '../extension_QRcode/extension_QRcode',
    })
  },
  //我的团队
  myteam:function(){
    wx.navigateTo({
      url: '../myteam/myteam',
    })
  },
  //待结算返利
  settledRebate:function(){
    wx.navigateTo({
      url: '../settledRebate/settledRebate',
    })
  },
  //分销订单
  retailOrder: function(){
    wx.navigateTo({
      url: '../retailOrder/retailOrder',
    })
  },
  //提现明细
  cashoutDetail: function(){
    wx.navigateTo({
      url: '../cashoutDetail/cashoutDetail'
    })
  },
  /**
   * 获取后台返回的可提现佣金，已提现返利，未提现返利
   */
  getInfor: function() {
    console.log('1')
    let that = this
    this.setData({
      token: wx.getStorageSync('token'),
      vipid: wx.getStorageSync('vipid')
    })
    httpReq({
      url: ApiUrl.phplist + 'member/rebate?token=' + this.data.token + '&member_id=' + this.data.vipid,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((res) => {
      console.log(res)
      if (res.data.code == 10001) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
      } else {
        //取到数据后赋值可提现佣金，已提现返利，未提现返利
        let lists = res.data.lists
        that.setData({
          dedCommission: Number(lists.can_rebat),//可提现佣金
          propRebate: Number(lists.cach_total),//已提现返利
          unpaidRebate: Number(lists.can_rebat) + Number(lists.no_cash)//未提现返利
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1')
    this.getInfor()//获取后台返回的可提现佣金，已提现返利，未提现返利
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

  },
})