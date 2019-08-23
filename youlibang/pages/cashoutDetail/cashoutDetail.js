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
    openstatusList: [],
    opendetailList: []

  },
  tabSwitch: function (e) {
    let that = this
    let tab  = e.target.dataset.current
    if (this.data.currentab == tab) {
      return false
    } else {
      that.setData({
        currentab: tab
      })
    }
    that.getWithdrawInfor()
    // console.log(this.data.currentab)
  },
  onTabChange: function (e) {
    // console.log(e.detail.current)
    var that = this
    let tab = e.detail.current
    that.setData({
      currentab: tab
    })
    that.getWithdrawInfor()
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
      url: ApiUrl.phplist + 'user/tixianlist?member_id=' + wx.getStorageSync('vipid') + '&token=' + wx.getStorageSync('token') + '&state=' + (Number(that.data.currentab)+1),
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((res) => {
      console.log(res) 
      let lists = res.data.lists
      let tixianList = []
      for (let m in lists) {
        let ss = {}
        ss.withdrawTime = lists[m].create_time
        ss.withdrawMoney = lists[m].money
        tixianList.push(ss)
      }
      console.log(tixianList)
      if(Number(that.data.currentab) == 0) {
        that.setData({
          openstatusList: tixianList
        })
      } else if(Number(that.data.currentab) == 1){
        that.setData({
          opendetailList: tixianList
        })
      }
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