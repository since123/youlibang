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
    dedCommission: '200',
    propRebate: '148',
    unpaidRebate: '50',
    token: '11'
  },
  //申请会员
  applyVIP:function(){
    let vipid = wx.getStorageSync('vipid')
    if (vipid){
      wx.showModal({
        title: '提示',
        content: '您已经是会员了，无法再更改会员等级',
      })
    }else {
      wx.navigateTo({
        url: '../applyVIP/applyVIP',
      })
    }
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
    let that = this
    this.setData({
      token: wx.getStorageSync('token')
    })
    httpReq({
      url: ApiUrl.phplist + 'member/rebate?token=' + this.data.token,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((res) => {
      console.log(res.data)
      //取到数据后赋值可提现佣金，已提现返利，未提现返利
      let lists = res.data.lists
      that.setData({
        dedCommission: Number(lists.dedCommission),
        propRebate: Number(lists.propRebate),
        unpaidRebate: Number(lists.unpaidRebate)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  }
})