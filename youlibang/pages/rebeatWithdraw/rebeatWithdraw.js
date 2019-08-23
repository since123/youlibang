// pages/withdraw/withdraw.js
// var amount=''
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
let util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: wx.getStorageSync('inform'),
    amount: wx.getStorageSync('inform').usermoney,
    someMoney: '请输入提现余额',
    token: '',
    describe: 'fanli',
    ifNumber: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 得到后台数据
   */
  getInform: function () {

  },
  /**
   * 得到输入金额
   */
  getMoney: function (e) {
    if (e.detail.value) {
      this.setData({
        someMoney: e.detail.value,
        ifNumber: true
      })
    } else {
      this.setData({
        someMoney: '请输入提现金额',
      })
    }
    console.log(this.data.someMoney)
  },
  /**
   * 得到全部余额
   */
  getAll: function () {
    let amount = this.data.inform.usermoney
    this.setData({
      someMoney: amount,
    })
    console.log(this.data.amount)
  },
  /**
   * 提现
   */
  withdrawal: function () {
    let that = this
    if (!util.isNumber(this.data.someMoney) || this.data.someMoney <= 0){
      this.setData({
        ifNumber: false
      })
      return false
    }
    let token = wx.getStorageSync('token')
    let vipid = wx.getStorageSync('vipid')
    that.setData({
      token: token
    })
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/memberCash?token=' + token + '&describe=' + this.data.describe + '&fee=' + this.data.someMoney + '&member_id=' + vipid,
    }).then((res) => {
      console.log(res.data.msg)
    })
  },
  // withdrawal:function(){
  // var status = this.data.status;
  // // console.log("触发了点击事件，弹出toast")
  // status = !status;
  // this.setData({
  //   status: status
  // })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果

  // },
  // toastHide: function (event) {
  //   // console.log("触发bindchange，隐藏toast")
  //   status = true
  //   this.setData({
  //     status: status
  //   })
  // },
  // quxiao: function () {
  //   // console.log(1);
  //   this.setData({
  //     status: false
  //   })
  // },
  //手动提现
  // handsWithdraw:function(){
  //   var that=this;
  //   var openId=wx.getStorageSync('openId')
  //   this.setData({
  //     status: false
  //   })
  // },
  //自动提现
  // allWithdraw:function(){

  // },

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