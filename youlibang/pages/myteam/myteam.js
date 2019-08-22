// pages/myteam/myteam.js
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
    order: true,
    currentGrade: 1,
    oneGradeNum: 2,
    twoGradeNum: 3,
    oneTeamInfor: [
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019-01-01',
        personNum: '2',
        money: '40.00',
        orderNum: '2'
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019-01-01',
        personNum: '2',
        money: '40.00',
        orderNum: '2'
      }
    ],
    twoTeamInfor: [
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNum: '2',
        money: '40.00',
        orderNum: '2'
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNum: '2',
        money: '40.00',
        orderNum: '2'
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNum: '2',
        money: '40.00',
        orderNum: '2'
      }
    ]
  },
  openstatus: function (e) {
    var that = this
    var order = this.data.order
    console.log(this.data.order)
    if (order == true) {
      
    } else {
      that.setData({
        order: true,
        currentGrade:1
      })
      this.getTeamInfor()
    }
  },
  opendetail: function (e) {
    var that = this
    var order = this.data.order
    console.log(this.data.order)
    if (order == true) {
      that.setData({
        order: false,
        currentGrade: 2
      })
      this.getTeamInfor()
    } else {

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getTeamInfor: function(){
    let that = this
    let app = getApp()
    let token = wx.getStorageSync('token')
      httpReq({
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        url: ApiUrl.phplist + 'distribution/myteam?token=' + token + '&level=' + this.data.currentGrade + '&member_id=' + wx.getStorageSync('vipid'),
      }).then((res) => {
        console.log(res.data)
        let lists = res.data.lists
        let teamInfor = []
        for (let m in lists) {
          let teamMember = {}
          teamMember.image = lists[m].avatar
          teamMember.userName = lists[m].nickname
          teamMember.time = util.formatTime(new Date(lists[m].create_time)) 
          teamMember.personNum = Number(lists[m].member_count)
          teamMember.money = Number(lists[m].amount)
          teamMember.orderNum = Number(lists[m].order_count)
          console.log(lists[m].nickname)
          teamInfor.push(teamMember)
        }
        console.log(this.data.currentGrade)
        if (Number(this.data.currentGrade) == 1) {
          console.log(this.data.currentGrade)
          that.setData({
            oneTeamInfor : teamInfor
          })
        } else if (Number(this.data.currentGrade) == 2){
          that.setData({
            twoTeamInfor : teamInfor
          })
        }
      })
  },
  onLoad: function (options) {
    this.getTeamInfor()
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