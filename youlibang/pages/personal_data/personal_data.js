// pages/personal_data/personal_data.js
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
    src: "../../images/Business_license@2x.png",
    vipname:'蜡笔小新',
    bindphone:'13589068345',
    sex:'男',
    address:'广州市天河区',
    wechat:'Ly34983753',
    tuijianID:'23749374930',
    idCard1:'../../images/idCard@2x.png',
    idCard2:'../../images/idCardbg@2x.png',
    businesslicense:'../../images/Business_license@2x.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var user = wx.getStorageSync('user');
    console.log(user);
    this.setData({
      user: user
    });
    this.getPersonalInfo();
  },
  //获取页面数据
  getPersonalInfo() {
    var that = this;
    wx.request({
      url: ApiUrl.phplist +'user/getdetail',
      data: {
        user_id: 1
      },
      header: { //请求头
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      method: "GET", //get为默认方法/POST
      success: function(res) {
        console.log(res.data.list); //res.data相当于ajax里面的data,为后台返回的数据
        let list = res.data.list
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数 　　　　
          logs: res.data.result,
          vipname: list.user_nickname,
          src: list.user_logo,
          bindphone: list.user_phone,
          sex: list.sex
        })
      },
      fail: function(err) {}, //请求失败
      complete: function() {} //请求完成后执行的函数
    })

  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})