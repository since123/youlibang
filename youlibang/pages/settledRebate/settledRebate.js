// pages/settledRebate/settledRebate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalMoney: 200.00,
    teamRebateList: [
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019 - 08 - 09',
        userMoney: 20.00
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李四',
        time: '2019 - 08 - 09',
        userMoney: 20.00
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '张三',
        time: '2019 - 08 - 09',
        userMoney: 10.00
      },
      {
        image: '/../images/2013062320262198.jpg',
        userName: '李三',
        time: '2019 - 08 - 09',
        userMoney: 20.00
      }
    ]
  },
  /**
   * 获取后台数据
   */
  getTeamRebate: function() {
    let that = this
    httpReq({

    }).then((res) => {
      //获取后台数据
    })
  },
  /**
   * 计算总收益
   */
  getTotalRebate: function () {
    let that = this
    let total = 0
    for (let i = 0; i < this.data.teamRebateList.length; i++) {
      total += this.data.teamRebateList[i].userMoney
    }
    that.setData({
      totalMoney : total
    })
    console.log(tihs.data.totalMoney)
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