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
    logs.unshift(Date.now())
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
            url: '',
            // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxf7a9fda47682a9a6&secret=cc74bba5adfa5e077038c5cb8baca13c&js_code='+ res.code+'&grant_type=authorization_code'
            // url: ApiUrl.phplist + 'index/gettoken?code=' + res.code,
            // success: function (res) {
            //   console.log(res.openid)
            //   wx.setStorageSync("openid", res.openid)
            //   wx.setStorageSync("session_key", res.session_key)
            // },
            // fail: function () {
            //   console.log('获取失败' + res.errMsg)
            //   wx.setStorageSync("openid", "txjfalseopenid")
            //   wx.setStorageSync("session_key", "txjfalsesession")
            // }
          }).then((res) =>{
            // console.log(res.data.lists.token)
            // console.log(wx.getStorageSync(res.data.lists.token))
            wx.setStorageSync("openid", "txjfalseopenid")
            wx.setStorageSync("session_key", "txjfalsesession")
            // wx.setStorageSync("openid", res.openid)
            // wx.setStorageSync("session_key", res.session_key)
          })
        } else {
          console.log('登录失败' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // console.log(res.authSetting['scope.userInfo'])
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function(res) {}
          })
        } else {
          wx.showModal({
            title: '警告通知',
            content: '您点击了拒绝授权,将无法正常显示个人信息,在设置中确定重新获取授权。',
          })
        }
      },
      fail: function(res) {}
    })
  },
  globalData: {
    userInfo: null,
    vipid: 'txjfalsevipid'
  }
})