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
    currentab: 0,
    oneGradeNum: 2,
    twoGradeNum: 3,
    oneTeamInfor: [
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019-01-01',
        personNun: 2,
        money: '40.00',
        orderNum: 2
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019-01-01',
        personNun: 2,
        money: '40.00',
        orderNum: 2
      }
    ],
    twoTeamInfor: [
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNun: 2,
        money: '40.00',
        orderNum: 2
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNun: 2,
        money: '40.00',
        orderNum: 2
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019-01-01',
        personNun: 2,
        money: '40.00',
        orderNum: 2
      }
    ]
  },
  openstatus: function () {
    var that = this
    var order = this.data.order
    if (order == true) {

    } else {
      that.setData({
        order: true
      })
    }
  },
  opendetail: function () {
    var that = this
    var order = this.data.order
    if (order == true) {
      that.setData({
        order: false
      })
    } else {

    }
  },
  /**
   * 获取后台数据
   */
  getTeamInfor: function() {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + '',
    }).then((res) => {
      // console.log(res.data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getTeamInfor()
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