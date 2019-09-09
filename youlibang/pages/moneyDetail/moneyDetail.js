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
    date: "",
    changedate: '',
    listinfo: [],
    comeInAmount: 0,
    expendAmount: 0,
    vipid: '',
    token: '',
    timestamp: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      date: util.formatTime(new Date())
    })
    console.log(new Date())//Mon Sep 09 2019 14:29:11 GMT+0800 (中国标准时间)
    console.log(this.data.date)//2019-09-09
    console.log(new Date(new Date().toLocaleDateString()).getTime())
    console.log(new Date(new Date(this.data.date).toLocaleDateString()).getTime())
    this.getMoneyDetail()
  },
  changeDate:function(e){
    this.setData({ 
      date: e.detail.value,
      changedate: e.detail.value
    });
    console.log(this.data.date)
    this.getMoneyDetail()
  },
  /**
   * 获取后台数据
   */
  getMoneyDetail() {
    let that = this
    //转换成时间戳
    let truedate = that.data.changedate == '' ? that.data.date : that.data.changedate
    let datestamp = new Date(new Date(truedate).toLocaleDateString()).getTime()
    console.log(datestamp)
    let nowDate = datestamp / 1000
    // console.log(nowDate)
    // console.log(wx.getStorageSync('vipid'))
    // console.log(wx.getStorageSync('token'))
    // console.log(util.formatTime(new Date(nowDate*1000)))
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/flowAccount?time=' + nowDate + '&member_id=' + wx.getStorageSync('vipid')+ '&token=' + wx.getStorageSync('token'),
    }).then((res) => {
      console.log(res)
      if (res.data.code == '10001') {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
        that.setData({
          listinfo: [],
          comeInAmount: 0,
          expendAmount: 0
        })
      } else{
        let folow = res.data.lists.folow
        let tixian = res.data.lists.tixian
        let lists = folow.concat(tixian)
        console.log(lists)
        let listinfo = []
        let comeIn = 0
        let expend = 0
        for (let m in lists) {
          let moneylist = {}

          if (Number(lists[m].pay_type) == 0) {
            moneylist.text = '提现-到微信'
          }
          else if (Number(lists[m].pay_type) == 1) {
            moneylist.text = '商城消费'
          }
          else if (Number(lists[m].pay_type) == 2) {
            moneylist.text = '返利'
          }
          else if (Number(lists[m].pay_type) == 3) {
            moneylist.text = '充值'
          }
          moneylist.datetime = util.formatTime(new Date(lists[m].create_time))
          console.log(lists[m].create_time)
          if (Number(lists[m].pay_type) == 0 || Number(lists[m].pay_type) == 1) {
            moneylist.money = "-" + Number(lists[m].amount)
            expend += Number(lists[m].amount)
          } else {
            moneylist.money = "+" + Number(lists[m].amount)
            console.log(moneylist.money)
            comeIn += Number(lists[m].amount)
          }
          listinfo.push(moneylist)
        }
        that.setData({
          listinfo: listinfo,
          comeInAmount: comeIn,
          expendAmount: expend
        })
      }
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