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
    listinfo: [],
    comeInAmount: 0,
    expendAmount: 0,
    vipid: wx.getStorageSync('vipid'),
    token: wx.getStorageSync('token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: util.formatTime(new Date())
    })
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
    //转换成时间戳
    let nowDate = new Date(this.data.date).getTime() / 1000
   // console.log(util.formatTime(new Date(nowDate*1000)))
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/flowAccount?time=' + nowDate + '&member_id=' + this.data.vipid + '&token=' + this.data.token,
    }).then((res) => {
      console.log(res)
      let lists = res.data.lists
      let listinfo = []
      let comeIn = 0
      let expend = 0
      // console.log(lists.length)
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
        else if (Number(lists[m].pay_type) == 3){
          moneylist.text = '充值'
        }
        moneylist.datetime = util.formatTime(new Date(lists[m].create_time)) 
        if (Number(lists[m].pay_type) == 0 || Number(lists[m].pay_type) == 1) {
          moneylist.money = Number("-" + lists[m].money)
          expend += Number(lists[m].money)
        } else {
          moneylist.money = Number(lists[m].money)
          comeIn += Number(lists[m].money)
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