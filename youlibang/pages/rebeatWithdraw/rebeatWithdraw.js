// pages/withdraw/withdraw.js
// var amount=''
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
    amount: '',
    someMoney: '',
    token: '',
    describe: '余额提现'
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
    this.setData({
      someMoney: e.detail.value
    })
    console.log(this.data.someMoney)
  },
  /**
   * 得到全部余额
   */
  getAll: function () {
    this.setData({
      someMoney: amount
    })
  },
  /**
   * 提现
   */
  withdrawal: function () {
    let that = this
    let token = wx.getStorageSync('token')
    that.setData({
      token: token
    })
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/rebatecash?token=' + token + '&describe=' + this.data.describe + '&fee=' + this.data.someMoney,
    }).then((res) => {
      console.log(res)
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