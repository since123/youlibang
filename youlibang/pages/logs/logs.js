//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    movies: [
      {
        url: '/image/run01.jpg',
        link: ''
      },
      {
        url: '/image/run02.jpg',
        link: ''
      },
      {
        url: '/image/run03.jpg',
        link: ''
      }
    ]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
