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
    amount: wx.getStorageSync('inform').usermoney ? wx.getStorageSync('inform').usermoney : 0,
    someMoney: '请输入提现余额',
    token: '',
    describe: 'qianbao',
    ifNumber: true,
    ifError: true,
    errorMessage: '服务器错误'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 得到后台数据
   */
  getInform: function(){
    
  },
  /**
   * 得到输入金额
   */
  getMoney: function(e) {
    if (e.detail.value) {
      this.setData({
        someMoney: e.detail.value,
        ifNumber: true
      })
    }else {
      this.setData({
        someMoney: '请输入提现金额',
      })
    }
    
    console.log(this.data.someMoney)
  },
  /**
   * 得到全部余额
   */
  getAll: function() {
    let amount = this.data.amount
    console.log(this.data.someMoney)
    this.setData({
      someMoney: amount,
    })
    console.log(this.data.someMoney)
  },
  /**
   * 提现
   */
  withdrawal: function() {
    let that = this
    let vipid = wx.getStorageSync('vipid')
    if (!util.isNumber(this.data.someMoney) || this.data.someMoney <=0) {
      that.setData({ifNumber:false})
      return false
    }
    let token = wx.getStorageSync('token')
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
      console.log(res)
      let errorMessage = res.data.msg;
      if (errorMessage != '') {
        that.setData({
          ifError: false,
          errorMessage: errorMessage
        })
      }
    })
  },
  errorconfirm: function () {
    this.setData({
      ifError: true,
    })
  },
  errorcancel: function () {
    this.setData({
      ifError: true,
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