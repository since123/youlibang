// pages/recharge/recharge.js
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
    amount:'',
    body: '充值'
  },
  /**
   * 获取输入金额
   */
  getAmoutValue: function(e){
    this.setData({
      amount:e.detail.value
    })
    console.log(this.data.amount)
  },
  //充值
  recharge: function() {
    var that=this;
    var token = wx.getStorageSync("token")
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'order/orderpay?pay_amount=' + this.data.amount + '&body=' + this.data.body + '&token=' + token,
      // url: ApiUrl.phplist + 'order/orderpay?pay_amount=' + this.data.amount,
      }).then((res)=>{
        console.log(res)
        if (res.data.code == '1') {
          that.setData({
            payParams: res.data.data // 后端从微信得到的统一下单的参数
          })
          wx.showToast({
            title: '充值成功',
            icon: "success",
            duration: 2000, //持续的时间
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../recharge/recharge',
            })
          }, 1000)  //定时函数确保状态显示之后再返回上一页
          that.xcxPay(); // 拿到统一下单的参数后唤起微信支付页面
        }
      })
    // wx.request({　　
    //   url: "",
    //   method: "POST",
    //   dataType: "json",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     amount: amount, // 充值金额
    //     token: token,
    //     openId: openId
    //   },
      // success: function(res) {
        // if (res.data.code == '1') {
        //   that.setData({
        //     payParams: res.data.data // 后端从微信得到的统一下单的参数
        //   })
        //   wx.showToast({
        //     title: '充值成功',
        //     icon: "success",
        //     duration: 2000, //持续的时间
        //   })
        //   setTimeout(function () {
        //     wx.navigateTo({
        //       url: '',
        //     })
        //   }, 1000)  //定时函数确保状态显示之后再返回上一页
        //   that.xcxPay(); // 拿到统一下单的参数后唤起微信支付页面
        // }
      // },
      // fail:function(res){
      //   console.log(res);
      //   wx.showToast({
      //     title:'充值失败',
      //     icon:'warn',
      //     duration:2000,//持续时间
      //   })
      //   setTimeout(function(){
      //     wx.navigateTo({
      //       url: '',
      //     },1000)
      //   })
      // }
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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