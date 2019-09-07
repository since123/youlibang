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
    token : '',
    formValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getformValue()
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
    if (wx.getStorageSync('loginStatus') == false) {
      wx.showModal({
        title: '提示！',
        content: '请先登录',
      })
      return false
    } else {
      this.setData({
        modalHidden: !this.data.modalHidden
      })
    }
  },
  modalBindaconfirm: function () {
    let that = this
   
    that.setData({
      modalHidden: !that.data.modalHidden,
      show: !that.data.show,
      tip: '您点击了【是】按钮！',
      buttonDisabled: !that.data.buttonDisabled
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