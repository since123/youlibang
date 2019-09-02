// pages/userAddress/userAddress.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['湖北省', '武汉市', '洪山区'],
    address: '',
    customItem: '全部',
    token: '',
    vipid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
      region: wx.getStorageSync('region')
        || ['湖北省', '武汉市', '洪山区'],
      address: ''
    })
    qqmapsdk = new QQMapWX({
      key: 'KXRBZ-VZARV-YUYPW-USY6I-A7FIF-3ZBT4'
    });
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      address: ''
    })
    wx.showModal({
      title: '提示',
      content: '请输入详细地址',
    })
  },
  getAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
    console.log(this.data.address)
  },
  getFullAddress() {
    const address = this.data.address

    if (!address) {
      wx.showModal({
        title: '提示',
        content: '请输入详细地址',
      })
      return
    }

    const region = this.data.region
    const fullAddress = region[0] + region[1] + region[2] + address

    qqmapsdk.geocoder({ //获取目标地址的地图信息，把详细地址输入address即可
      address: fullAddress,
      success: function (res) {    //返回的数据里面有该地址的经纬度
        // console.log(1, res)
        const location = res.result.location
        const token = wx.getStorageSync('token')
        const vipid = wx.getStorageSync('vipid')
        httpReq({
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          url: ApiUrl.phplist + 'member/deliverAddress?token=' + token + '&lon=' + location.lon + '&lat=' + location.lat + '&member_id=' + vipid + '&address=' + fullAddress,
        }).then((res) => {
          console.log(res)
          console.log(fullAddress)
          wx.setStorageSync('region', region)
          wx.setStorageSync('address', address)
          wx.setStorageSync('fullAddress', fullAddress)
          wx.showModal({
            title: '提示',
            content: '地址保存成功！',
          })
        }).catch(e => {
          wx.showModal({
            title: '提示',
            content: '地址保存失败！',
          })
        });
      },
      fail: function (res) {
        console.log('e', '转换地址失败', res)
      }
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