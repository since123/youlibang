// pages/set/set.js
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
    modalHidden: true,
    token : wx.getStorageSync('token'),
    userid: wx.getStorageSync('userid'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getifAuthorize()
    this.isMember()
  },
  // /**
  //  *检查是否授权
  //  */
  getifAuthorize: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // console.log(res.authSetting['scope.userInfo'])
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function (res) { }
          })
        } else {
        }
      },
      fail: function (res) { }
    })
  },
  //更换手机号
  updatephone:function(){
    wx.navigateTo({
      url: '../updatePhone/updatePhone',
    })
  },
  updatePwd:function(){
    wx.navigateTo({
      url: '../updatePwd/updatePwd',
    })
  },
  //退出登录
  logout:function(){
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show,
      tip: '您点击了【是】按钮！',
      buttonDisabled: !this.data.buttonDisabled
    })
  },

  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      tip: '您点击了【否】按钮！'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  //点击允许获取用户信息
  bindGetUserInfo(e) {
    // console.log(e.detail.userInfo)
    //点击获取userInfo并缓存
    console.log(typeof (e.detail.userInfo))
    wx.setStorageSync('userInfo', e.detail.userInfo)
    let that = this
    if (!that.ifAllInform()) {
      wx.showModal({
        title: '提示！',
        content: '必须授权用户基本信息和手机号',
      })
    } else {
      //this.isMember()
      console.log('1')
      this.saveUserInform()
      console.log('先电话再信息')
       //刷新上一个页面
      var pages = getCurrentPages()
      pages[pages.length - 2].onLoad()
    }
    
  },
  //点击允许获取手机号
  getPhoneNumber: function (e) {
    let that = this
    console.log(e)
    wx.setStorageSync('encryptedData', e.detail.encryptedData)
    if (!that.ifAllInform()) {
      wx.showModal({
        title: '提示！',
        content: '必须授权用户基本信息和手机号',
      })
    } else {
      //this.isMember()
      this.saveUserInform()
      console.log('先信息再电话')
      //刷新上一个页面
      var pages = getCurrentPages()
      pages[pages.length - 2].onLoad() 
    }
  },
  //检查用户信息和手机号是否获取完整
  ifAllInform: function(){
    let userInfo = wx.getStorageSync('userInfo')
    let encryptedData = wx.getStorageSync('encryptedData')
    if (userInfo == '' || encryptedData == '') {
      return false
    } else {
      return true
    }
  },
  /**
   * 将用户信息存入数据库
   */
  saveUserInform: function() {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'index/usersave?mobile=' + wx.getStorageSync('encryptedData') + '&wx_info=' + wx.getStorageSync('userInfo') + '&token=' + wx.getStorageSync('token'),
    }).then((res) => {
      console.log(res)
    })
  },

  /**
     * 是否是注册的会员
    */
  isMember() {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/ismember?token=' + wx.getStorageSync('token') + '&user_id=' + wx.getStorageSync('userid'),
    }).then((res) => {
      let vipid = res.data.lists
      if (vipid) {
        wx.setStorageSync('vipid', vipid)
        console.log(vipid)
      } else {
        wx.setStorageSync('vipid', 0)
        console.log('您不是会员')
      }
    })
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