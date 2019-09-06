// pages/recharge/recharge.js
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
    amount:'',
    body: '充值',
    status: false,
    payway: '',
    ifNumber: true,
  },

  /**
   * 获取输入金额
   */
  getAmoutValue: function(e){
    this.setData({
      amount: e.detail.value,
      ifNumber: true
    })
  },

  recharge: function () {
    if (!util.isNumber(this.data.amount) || this.data.amount <= 0) {
      this.setData({
        amount: this.data.amount,
        ifNumber: false
      })
      console.log('不是数字')
      return false
    }
    var status = this.data.status;
    // console.log("触发了点击事件，弹出toast")
    status = !status;
    this.setData({
      status: status
    })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  },

  cancelPay: function () {
    var status = this.data.status;
    status = !status;
    this.setData({
      status: status
    })
  },
  
  //确认支付
  confirmPay: function() {
    if (this.data.payway == 'wexinPayfor') {
      this.confirmWeixinPay()
    }else {
      this.confirmXianxiaPay()
    }
  },
  /**
   * 通过微信支付
   */
    confirmWeixinPay: function () { 
    var that = this;
    var token = wx.getStorageSync("token")
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/memberPay?pay_amount=' + this.data.amount + '&body=' + this.data.body + '&token=' + token + '&member_id=' + wx.getStorageSync('vipid') ,
      // url: ApiUrl.phplist + 'order/orderpay?pay_amount=' + this.data.amount,
    }).then((res) => {
      console.log(res)
      wx.requestPayment({
        timeStamp: res.data.lists.timeStamp,
        nonceStr: res.data.lists.nonceStr,
        package: res.data.lists.package,
        signType: 'MD5',
        paySign: res.data.lists.paySign,
        success: function (res) {
          // success
          console.log(res);
        },
        fail: function (res) {
          // fail
          console.log(res);
        },
        complete: function (res) {
          // complete
          that.setData({
            status : false
          })
          
        }
      })
    })
  },
  /**
   * 通过线下支付
   */
  confirmXianxiaPay : function() {
    let that = this
    console.log(that.data.payway)
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/orderpay?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid') + '&pay_type=' + that.data.payway,
    }).then((res) => {
      console.log(res)
      if (res.data.code == 10001) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
      } else {
        wx.showModal({
        title: '提示',
        content: '线下联系工作人员完成线下支付',
      })
      this.setData({
        status: false
      })
        that.onLoad()
      }
    })
  },
  payway(e) {
    let payway = e.detail.value
    this.setData({
      payway: payway
    })
    console.log(this.data.payway)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})