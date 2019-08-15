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
    totalMoney: '0.00',
    teamRebateList: [
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019 - 08 - 09',
        userMoney: '0.00'
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019 - 08 - 09',
        userMoney: '0.00'
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019 - 08 - 09',
        userMoney: '0.00'
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李三',
        time: '2019 - 08 - 09',
        userMoney: '0.00'
      }
    ]
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
      url: ApiUrl.phplist + '?token=' + this.data.token,
    }).then((res) => {
      console.log(res);
      let list = res.data.lists
      //获取后台数据
      // image: '/../images/2013062320262198.jpg',
      // userName: '李三',
      // time: '2019 - 08 - 09',
      // userMoney: '0.00'
    })
  },
  /**
   * 计算总收益
   */
  getTotalRebate: function () {
    let that = this
    let total = 0
    for (let i = 0; i < this.data.teamRebateList.length; i++) {
      total += Number(this.data.teamRebateList[i].userMoney)
    }
    that.setData({
      totalMoney : total
    })
    console.log(this.data.totalMoney)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getTeamRebate()//获取后台数据
    this.getTotalRebate()
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