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
    ifdisplay: '',
    token : wx.getStorageSync('token'),
    userid: wx.getStorageSync('userid'),
    formValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getifAuthorize()
    this.getformValue()
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
    if (this.data.formValue) {
      wx.navigateTo({
        url: '../updatePwd/updatePwd?formValue=' + this.data.formValue,
      })
    }
  },
  //判断显示修改密码哪个页面
  getformValue: function () {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/getcheck?token=' + wx.getStorageSync('token'),
    }).then((res) => {
      console.log(res)
      let formValue = res.data.lists
      that.setData({
        formValue: formValue
      })
      console.log(that.data.formValue)
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
    wx.clearStorage()
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