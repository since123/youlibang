// pages/moneyDetail/moneyDetail.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
let util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2019-08-02",
    listinfo: [
      {text:'提现-到微信',datetime: '10月9日 00:09:01', money: '2000'},
      {text: '返利',datetime: '10月9日 00:09:01', money: '2000' },
      { text: '消费', datetime: '10月9日 00:09:01', money: '2000' },
      ],
    comeInAmount: '3524.00',
    expendAmount: '12000.00'
    // nowDate: new Date(date.getTime())
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.getMoneyDetail()
  },
  changeDate:function(e){
    this.setData({ 
      date: e.detail.value,
    });
    this.getMoneyDetail()
  },
  /**
   * 获取后台数据
   */
  getMoneyDetail() {
    let that = this
    let nowDate = new Date(this.data.date).getTime() / 1000
    let openid = wx.getStorageSync('openid')
    console.log("new Date(this.data.date).getTime(): " + nowDate)
    console.log(openid)
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/flowAccount?openid=' + openid + '&time=' + nowDate,
    }).then((res) => {
      console.log(res.data.lists)
      let lists = res.data.lists
      let listinfo = []
      let comeIn = 0
      let expend = 0
      // console.log(lists.length)
      for (let m in lists) {
        let moneylist = {}
        moneylist.text = lists[m].describe
        moneylist.datetime = lists[m].create_time
        
        if (Number(lists[m].type) == 0) {
          moneylist.money = "-" + lists[m].order_amount
          expend += Number(lists[m].order_amount)
        } else {
          moneylist.money = Number(lists[m].order_amount)
          comeIn += Number(lists[m].order_amount)
        }
        listinfo.push(moneylist)
      }
      that.setData({
        listinfo : listinfo,
        comeInAmount : comeIn,
        expendAmount: expend
      })
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