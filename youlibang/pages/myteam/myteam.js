// pages/myteam/myteam.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
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
        personNum: 2,
        money: '40.00',
        orderNum: 2
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019-01-01',
        personNum: 2,
        money: '40.00',
        orderNum: 2
      }
    ],
    twoTeamInfor: [
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNum: 2,
        money: '40.00',
        orderNum: 2
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNum: 2,
        money: '40.00',
        orderNum: 2
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNum: 2,
        money: '40.00',
        orderNum: 2
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
    let openid = wx.getStorageSync('openid')
    if (openid) {
      httpReq({
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        url: ApiUrl.phplist + 'distribution/myteam?openid=' + openid + '&level=' + this.data.currentGrade,
      }).then((res) => {
        console.log(res.data.lists)
        let lists = res.data.lists
        let teamInfor = []
        for (let m in lists) {
          let teamMember = {}
          teamMember.image = lists[m].avatar
          teamMember.userName = lists[m].nickname
          teamMember.time = lists[m].create_time
          teamMember.personNum = lists[m].member_count
          teamMember.money = lists[m].amount
          teamMember.orderNum = lists[m].order_count
          console.log(lists[m].nickname)
          teamInfor.push(teamMember)
        }
        console.log(this.data.currentGrade)
        if (this.data.currentGrade = 1) {
          that.setData({
            oneTeamInfor : teamInfor
          })
        } else {
          that.setData({
            twoTeamInfor : teamInfor
          })
        }
      })
    } else {
      console.log("我的团队页面openid获取失败")
    }
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