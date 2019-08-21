// pages/cashoutDetail/cashoutDetail.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:true,
    currentab: 0,
    swipertab: [{ index: 0, name: '待审核' }, { index: 1, name: '已打款'}],
    openstatusList: 
      [
    //     {
    //       withdrawTime: '10月8日 00: 09: 01',
    //       withdrawMoney: 200
    //     },
    //     {
    //       withdrawTime: '10月9日 00: 09: 01',
    //       withdrawMoney: 500
    //     }
    //   ],
    // opendetailList:
    //   [
    //     {
    //       withdrawTime: '10月7日 00: 09: 01',
    //       withdrawMoney: 100
    //     },
    //     {
    //       withdrawTime: '10月6日 00: 09: 01',
    //       withdrawMoney: 200
    //     }
      ]

  },

  // openstatus: function () {
  //   var that = this
  //   var order = this.data.order
  //   if (order == true) {

  //   } else {
  //     that.setData({
  //       order: true
  //     })
  //   }
  // },
  // opendetail: function () {
  //   var that = this
  //   var order = this.data.order
  //   if (order == true) {
  //     that.setData({
  //       order: false
  //     })
  //   } else {
  //   }
  // },
  tabSwitch: function (e) {
    let that = this
    let tab  = e.target.dataset.current
    if (this.data.currentab === tab) {
      return false
    } else {
      that.setData({
        currentab: tab
      })
    }
    // console.log(this.data.currentab)
  },
  onTabChange: function (e) {
    // console.log(e.detail.current)
    var that = this
    let tab = e.detail.current
    that.setData({
      currentab: tab
    })
  },
  /**
   * 获取后台数据
   */
  getWithdrawInfor: function () {
    let that = this
    let vipid = wx.getStorageSync('vipid')
    this.setData({
      token: wx.getStorageSync('token')
    })
    httpReq({
      url: ApiUrl.phplist + 'user/tixianlist?member_id=' + vipid,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((res) => {
      console.log(res.data)  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWithdrawInfor()
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