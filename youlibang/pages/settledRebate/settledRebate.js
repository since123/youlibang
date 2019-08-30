// pages/settledRebate/settledRebate.js
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
    accumulatedIncome: '0.00',
    token: wx.getStorageSync('token'),
    vipid: wx.getStorageSync('vipid'),
    teamRebateList: [],
    lineUrl: 'https://wx.ylbtl.cn'
  },
  /**
   * 获取后台数据
   */
  getTeamRebate: function() {
    let that = this
    let token = wx.getStorageSync('token')
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/rebatelist?token=' + this.data.token + '&member_id=' + this.data.vipid + '&status=2' ,
    }).then((res) => {
      console.log(res);
      if (res.data.code == 10001) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
      } else {
        let lists = res.data.lists
        let nameList = []
        for (let m in lists) {
          let list = {}
          // let urlStr = lists[m].avatar.replace(/\\/g, '/')
          // image = that.data.lineUrl + urlStr
          list.userName = lists[m].nickname
          list.income = Number(lists[m].no_cash)
          list.finishTime = util.formatTime(new Date(lists[m].confirm_time))
          nameList.push(list)
        }
        console.log(nameList)
        that.setData({
          nameList: nameList
        })

        //计算累计收益
        let total = 0
        for (let i = 0; i < this.data.nameList.length; i++) {
          total += Number(this.data.nameList[i].income)
        }
        this.setData({
          accumulatedIncome: total
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeamRebate()//获取后台数据
    //this.getTotalRebate()
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