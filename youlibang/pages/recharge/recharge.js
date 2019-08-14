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
    body: '充值',
    status: false,
    way: '微信'
  },

  /**
   * 获取输入金额
   */
  getAmoutValue: function(e){
    this.setData({
      amount: e.detail.value
    })
  },

  recharge: function () {
    var status = this.data.status;
    // console.log("触发了点击事件，弹出toast")
    status = !status;
    this.setData({
      status: status
    })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  },

  cancelPay: function () {
    var status = this.data.status;
    status = !status;
    this.setData({
      status: status
    })
  },
  
  // 通过微信充值
  confirmPay: function() {
    if (this.data.way == '微信') {
      this.confirmweixinPay()
    }else {
      this.confirmXianxiaPay()
    }
   
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
   * 通过微信支付
   */
    confirmweixinPay: function () { 
    var that = this;
    var token = wx.getStorageSync("token")
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'test/cszhifu?payAmount=' + this.data.amount + '&paydesc=' + this.data.body + '&token=' + token,
      // url: ApiUrl.phplist + 'order/orderpay?pay_amount=' + this.data.amount,
    }).then((res) => {
      console.log(res)
      wx.requestPayment({
        timeStamp: res.data.code.timeStamp,
        nonceStr: res.data.code.nonceStr,
        package: res.data.code.package,
        signType: 'MD5',
        paySign: res.data.code.paySign,
        success: function (res) {
          // success
          console.log(res);
        },
        fail: function (res) {
          // fail
          console.log(res);
        },
        complete: function (res) {
          // complete
          that.setData({
            status : false
          })
          
        }
      })
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
      //       url: '../recharge/recharge',
      //     })
      //   }, 1000)  //定时函数确保状态显示之后再返回上一页
      //   that.xcxPay(); // 拿到统一下单的参数后唤起微信支付页面
      // }
    })
  },
  /**
   * 通过线下支付
   */
  confirmXianxiaPay : function() {
    console.log('通过线下支付')
  },
  

  payway() {
    console.log("选择了微信支付！")
    this.setData({
      way: "微信"
    })
    console.log(this.data.way)
  },
  payWay() {
    console.log("选择了线下支付！")
    this.setData({
      way: "线下"
    })
    console.log(this.data.way)
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