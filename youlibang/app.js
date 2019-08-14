//app.js
import {
  ApiUrl
} from 'utils/apiurl.js';
import {
  httpReq
} from 'utils/http.js';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift('11')
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code) {
          console.log("res.code: " + res.code)
          //发起网络请求
          httpReq({
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            method: 'GET',
            url: ApiUrl.phplist + 'index/gettoken?code=' + res.code,
          }).then((res) =>{
            if (res.data.lists.token) {
              wx.setStorageSync('token', res.data.lists.token)
            } else {
              logs.unshift('app.js登陆页面token获取失败' + res.errMsg)
              wx.setStorageSync('logs', logs)
            }
          })
        } else {
          logs.unshift('res.code问题： ' + res.errMsg)
          wx.setStorageSync('logs', logs)
        }
      }
    })
  },
})