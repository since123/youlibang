// pages/rebateDetail/rebateDetail.js
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
    accumulatedIncome: '0',
    nameList: [
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        income: '10.00',
        finishTime: '2019-08-09',
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        income: '20.00',
        finishTime: '2019-08-09',
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        income: '50.00',
        finishTime:'2019-08-09',
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        income: '60.00',
        finishTime: '2019-08-09',
      }
    ]
  },
  getAccumulatedIncome: function() {
    
    // console.log(this.data.accumulatedIncome)//已经成功取到
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getInformation: function() {
    let that = this
    let token = wx.getStorageSync('token')
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + '',
    }).then((res) => {
      console.log(res);
      let lists = res.data.lists
      let nameList = {}
      for (let m in lists) {}
      // that.setData({
      //   image: lists.image,
      //   userName: lists.userName,
      //   income: Number(lists.income),
      //   finishTime: util.formatTime(new Date(lists.finishTime)) 
      // })

      //计算累计收益
      // let total = 0
      // for (let i = 0; i < this.data.nameList.length; i++) {
      //   total += Number(this.data.nameList[i].income)
      // }
      // this.setData({
      //   accumulatedIncome: total
      // })
    })
  },
  onLoad: function (options) {
    this.getAccumulatedIncome()
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