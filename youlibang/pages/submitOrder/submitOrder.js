// pages/submitOrder/submitOrder.js
import {
  httpReq
} from '../../utils/http.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
   status:true,
    txtOrderCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var total = 0
    var dataList=JSON.parse(options.info)
   console.log(dataList)
   if(dataList[0].way=='立即购买'){
         var total=dataList[0].num*dataList[0].price
         this.setData({
            total,
            dataList
            
         })
   }else if(dataList[0].way=='结算'){
     
         for(let i=0;i<dataList.length;i++){
               total+=(dataList[i].num*dataList[i].price)
         }
  console.log(total)
     this.setData({
       dataList,
       total
     })  
   }
  //  var token=wx.getStorageSync('token')
  //  //请求后端接口，拿到openid
  //   httpReq({
  //     header: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     url:'',
  //   }).then((res) => {
      
  //   });
  },
  payway(){
     console.log("通过微信支付！")
      this.setData({
        way:"微信"
      })
  },
  payWay(){
    console.log("通过钱包支付！")
     this.setData({
       way:"钱包"
     })
    
  },
   describe(){
      var status=this.data.status
      //console.log(status)
      status=!status
      //console.log(status)
      this.setData({
        status
      })
   },
   //失焦隐藏
   finish(){
      this.setData({
        status:true
      })
   },
   //获取输入框内容
   inputvalue(e){
       //console.log(e)
       var describe=e.detail.value
       this.setData({
         describe
       })
   },

  //确认支付
  confirm(){
   var describe=this.data.describe    //卖家备注
    var way=this.data.way             //支付方式
    var dataList=this.data.dataList   //订单信息
    var total=this.data.total         //总价
   
    if(describe==undefined){
      describe=''
    }
   // console.log(describe, dataList, total)
    //判断支付方式
    if(way=="微信"){
       //调取微信支付接口
       console.log("微信支付！")
      var ordercode = this.data.total;
      var token = wx.getStorageSync('token')
      var paydesc = '商品购买'
      console.log(ordercode, token, paydesc)
      wx.login({
        success: function (res) {
          if (res.code) {
            httpReq({
              header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              url: 'http://www.ylb.com/api/test/cszhifu?token=' + token + '&paydesc=' + paydesc + '&payAmount=' + ordercode,
            }).then((res) => {
              console.log(res)
              // console.log(res.data)
              // console.log(res.data.lists)
              // console.log(res.data.lists.timeStamp)
              console.log(res.data.code)
              wx.requestPayment({
                // timeStamp: res.data.lists.timeStamp,
                // nonceStr: res.data.lists.nonceStr,
                // package: res.data.lists.package,
                // signType: 'MD5',
                // paySign: res.data.lists.paySign,
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
                  console.log(res);
                }
              })
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });

    }else{
       //从本地存储中将余额拿出来
      //采用钱包余额支付
      try {
        var yue = wx.getStorageSync('yue')
        if (yue) {
          var price = this.data.price
          //判断余额是否可以购买
          if(yue<price){
            wx.showToast({
              title: '亲，余额不足哦，请立即充值！',
            })
          }else{
            wx.showToast({
              title: '购买成功！',
            })
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
   

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