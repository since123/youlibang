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
    txtOrderCode: '',
    defAddress:[],
    cart_id:[],
    address_id:''
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
        
   }else if(dataList[0].way=='结算'){
     
         for(let i=0;i<dataList.length;i++){
               total+=(dataList[i].num*dataList[i].price)
         }
  console.log(total)
     
   }
   //循环拿到cart_id
   var cart_id=[]
   for(let i=0;i<dataList.length;i++){
      cart_id.push(dataList[i].cart_id)
   }
    this.setData({
      total,
      dataList,
      cart_id
    })
 //console.log(this.data.cart_id)
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
     //若舒服内容为空
     if(this.data.describe==""){
       this.setData({
         status: true
       })
     }else{
       //若不为空

     }
     
   },
   //获取输入框内容
   inputvalue(e){
       //console.log(e)
       var describe=e.detail.value
       //过滤空格
       describe=describe.replace(/\s+/g,'')
       console.log(describe.length)
       this.setData({
         describe
       })
   },

  //确认支付
  confirm(){
   var describe=this.data.describe    //卖家备注
    var way=this.data.way             //支付方式
    var token=wx.getStorageSync('token') //token
    var member_id=wx.getStorageSync('vipid') //member_id
    var cart_id=this.data.cart_id   //cart_id
    var address_id=this.data.address_id  //address_id
    var total=this.data.total         //总价
    if(describe==undefined){
      describe=''
    }
    console.log(cart_id)
   // console.log(describe, dataList, total)
    //判断支付方式
    if(way=="微信"){
       //调取微信支付接口
       console.log("微信支付！")
      httpReq({
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method:'POST',
        data: { token, member_id, address_id, or_remark: describe, pay_type: way, cart_id:[30,31]},
        url: 'http://wx.ylbtl.cn/api/order/goodsPay',
      }).then((res) => {
          console.log(res)
          //判断返回值，若为真
          if(res.statusCode==200){
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
                    url: 'http://wx.ylbtl.cn/api/test/cszhifu?token=' + token + '&paydesc=' + paydesc + '&payAmount=' + ordercode,
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
          }
      })
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
    var token = wx.getStorageSync('token')
    var member_id = wx.getStorageSync('vipid')
    //请求默认地址接口
    var that = this
    console.log(token, member_id)
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: 'http://wx.ylbtl.cn/api/user/getSelectedAddress?token=' + token + '&member_id=' + member_id,
    }).then((res) => {
      console.log(res)
      var defAddress = res.data.lists
      var address_id=res.data.lists.id
      that.setData({
        defAddress,
        address_id
      })
     // console.log(this.data.defAddress)
    });
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