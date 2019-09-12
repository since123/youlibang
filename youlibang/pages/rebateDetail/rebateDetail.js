// pages/rebateDetail/rebateDetail.js
import { ApiUrl } from "../../utils/apiurl.js";
import { httpReq } from "../../utils/http.js";
let util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    accumulatedIncome: "0",
    nameList: [],
    lineUrl: ApiUrl.url
  },
  getAccumulatedIncome: function() {
    // console.log(this.data.accumulatedIncome)//已经成功取到
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getInformation: function() {
    let that = this;

    if (wx.getStorageSync("loginStatus") == false) {
      wx.showModal({
        title: "提示！",
        content: "请先登录"
      });
      return false;
    } else {
      httpReq({
        header: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        url:
          ApiUrl.phplist +
          "member/rebatelist?token=" +
          wx.getStorageSync("token") +
          "&member_id=" +
          wx.getStorageSync("vipid")
      }).then(res => {
        console.log(res);
        if (res.data.code == 10001) {
          return false
        } else {
          let lists = res.data.lists;
          let nameList = [];
          for (let m in lists) {
            let list = {};
            // let urlStr = lists[m].avatar.replace(/\\/g, '/')
            // image = that.data.lineUrl + urlStr
            list.userName = lists[m].nickname;
            list.income = Number(lists[m].no_cash);
            list.finishTime = util.formatTime(new Date(lists[m].confirm_time));
            nameList.push(list);
          }
          console.log(nameList);
          that.setData({
            nameList: nameList
          });

          //计算累计收益
          let total = 0;
          for (let i = 0; i < this.data.nameList.length; i++) {
            total += Number(this.data.nameList[i].income);
          }
          this.setData({
            accumulatedIncome: total
          });
        }
      });
    }
  },

  onLoad: function(options) {
    this.getAccumulatedIncome();
    this.getInformation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
