// pages/submitOrder/submitOrder.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
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
   status:true,
    txtOrderCode: '',
    defAddress:[],
    cart_id:[],
    address_id:'',
    state:false,
    selectArray:[],
    datalist:[],
    index:0,
    id:"",
    password:""
  },
   //封装函数
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

    console.log(options)
    if(options.info==undefined){
      wx.showModal({
        title: '提示',
        content: '您没有选择任何订单，不允许进行操作！',
      })
      return false
    }else{
      var total = 0
      var dataList = decodeURIComponent(options.info)
      dataList = JSON.parse(dataList)
      console.log(dataList)
      if (dataList[0].way == '立即购买') {
        var total = dataList[0].num * dataList[0].price

      } else if (dataList[0].way == '结算') {

        for (let i = 0; i < dataList.length; i++) {
          total += (dataList[i].num * dataList[i].price)
        }
        console.log(total)

      }
      //循环拿到cart_id
      var cart_id = []
      for (let i = 0; i < dataList.length; i++) {
        cart_id.push(dataList[i].cart_id)
      }
      this.setData({
        total,
        dataList,
        cart_id
      })

    }
   
 console.log(this.data.cart_id)


    var token = wx.getStorageSync('token')
    var member_id = wx.getStorageSync('vipid')
    var type = 1
    //请求默认地址接口
    var that = this
    console.log(token, member_id)
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/getSelectedAddress?token=' + token + '&member_id=' + member_id + '&type=' + type,
    }).then((res) => {
      console.log(res)
      var defAddress = res.data.lists
      console.log(defAddress)
      if (defAddress == undefined) {
        wx.showModal({
          title: '提示',
          content: '你还没有添加地址呢',
        })
        return false
      } else {
        var address_id = res.data.lists.id
        that.setData({
          defAddress,
          address_id
        })
        wx.setStorageSync('defAddress', defAddress)
        console.log(this.data.defAddress)
      }

      // console.log(this.data.defAddress)
    })
   
    // qqmapsdk = new QQMapWX({
    //   key: 'KXRBZ-VZARV-YUYPW-USY6I-A7FIF-3ZBT4'
    // })
    // var that = this
    // var address = this.data.defAddress
    // console.log(address)
    // var token = wx.getStorageSync('token')
    // var member_id = wx.getStorageSync('vipid')
    // qqmapsdk.geocoder({ //获取目标地址的地图信息，把详细地址输入address即可
    //   address: wx.getStorageSync('defAddress').address,
    //   success: function (res) {    //返回的数据里面有该地址的经纬度
    //     console.log(res.result.location.lat)
    //     var lat = res.result.location.lat
    //     var lon = res.result.location.lng
    //     //请求接口
    //     httpReq({
    //       header: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //       },
    //       url: ApiUrl.phplist + 'member/deliverAddress?token=' + token + '&lon=' + lon + '&lat=' + lat + '&member_id=' + member_id,
    //     }).then((res) => {
    //       console.log(res)
    //       if (res.data.msg == "操作成功") {
    //         httpReq({
    //           header: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //           },
    //           method: "POST",
    //           data: { token, lon, lat, member_id },
    //           url: ApiUrl.phplist + 'member/getDistance',
    //         }).then((res) => {
    //           console.log(res)
    //           var datalist = res.data.lists

    //           var arr = []
    //           for (let i = 0; i < datalist.length; i++) {
    //             var obj = {}
    //             obj.nickname = datalist[i].distance + ',' + datalist[i].nickname
    //             obj.id = datalist[i].id
    //             obj.name = datalist[i].nickname
    //             arr.push(obj)
    //           }
    //           console.log(arr)

    //           that.setData({
    //             datalist: arr
    //           })
    //           console.log(that.data.datalist)
    //         });

    //       }
    //     });
    //   },
    //   fail: function (res) {
    //     console.log("接口调用失败返回的回调")
    //   },
    //   complete: function (res) {
    //     console.log("接口调用结束的回调函数（调用成功、失败都会执行）")
    //   }
    // });


},
  payway(){
     console.log("通过微信支付！")
      this.setData({
        way:"wxpay"
      })
  },
  //密码栏点击关闭
  quxiao(){
     var state=this.data.state
     state=!state
     this.setData({
       state
     })
  },
  //查看最近的经销商
//   query(){
//    var token=wx.getStorageSync('token') //token
//   wx.chooseLocation({
//     success: function(res) {
//       console.log(res)
//       //将请求到的数据提交给后端
//       var lon = res.longitude
//       var lat = res.latitude
//       var member_id=wx.getStorageSync('vipid')
//       httpReq({
//         header: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         url: ApiUrl.phplist + 'member/deliverAddress?token='+token+'&lon='+lon+'&lat='+lat+'&member_id='+member_id,
//       }).then((res) => {
//        console.log(res)
//        if(res.data.msg=="操作成功"){
//          httpReq({
//            header: {
//              'Content-Type': 'application/json',
//              'Accept': 'application/json'
//            },
//            method:"POST",
//            data:{token,lon,lat,member_id},
//            url: ApiUrl.phplist +'member/getDistance',
//          }).then((res) => {
//            console.log(res)
//          });

//        }
//       });
//     },
//   })
//     //通过输入地址确定经纬度
//     // qqmapsdk.geocoder({ //获取目标地址的地图信息，把详细地址输入address即可
//     //   address: '南宁市西乡塘区秀厢大道东祥云商务酒店',
//     //   success: function (res) {    //返回的数据里面有该地址的经纬度
//     //     console.log(res)
//     //   },
//     //   fail: function (res) {
//     //     console.log(res)
//     //   },
//     //   complete: function (res) {
//     //     console.log(res)
//     //   }
//     // })
//     // var status=this.data.status
//     // status=!status
//     // this.setData({
//     //   status
//     // })
// },
queren(e){
   console.log(e)
  var password = e.detail.value
  this.setData({
    password
  })
},
  payWay(){
    console.log("通过钱包支付！")
     this.setData({
       way:"qianbao"
     })
    
  },
  chooseAddress(){
      wx.navigateTo({
        url: '../myAddress/myAddress?type=1',
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
     //若输入内容为空
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
   //钱包支付
  confirmPwd(){
    var password = this.data.password
    var describe = this.data.describe    //卖家备注
    var way = this.data.way             //支付方式
    var token = wx.getStorageSync('token') //token
    var member_id = wx.getStorageSync('vipid') //member_id
    var cart_id = this.data.cart_id   //cart_id
    var address_id = this.data.address_id  //address_id
    var total = this.data.total         //总
    //过滤空格
    password = password.replace(/ /g, '')
    if(password==""){
      wx.showModal({
        title: '提示',
        content: '请有输入密码！',
      })
      return false
    }
    var that=this
    // 'token'
    // member_id
    // 'cart_id'=> []
    // 'or_remark'=> 订单 备注
    // 'pay_type'=> 支付方式
    // 'address_id'=> 地址id、
    // 'fee'=> 支付金额
     //验证密码
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/confirmPsw?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid') + '&psw=' + password,
    }).then((res) => {
      console.log(res)
      //成功
      let status = res.data.lists
      if (status) {
        that.setData({
          ifPassword: true
        })
        //请求支付接口
        httpReq({
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'POST',
          data: { token, member_id, address_id, or_remark: '123', pay_type: way, cart_id,free:total},
          url: ApiUrl.phplist + 'order/goodsPay',      //线上
        }).then((res) => {
          console.log(res)
          if (res.data.code != 10000) {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '支付成功',
            })
            that.setData({
              state: false
            })
          }
         
        })
      } else {
        // 密码错误
        wx.showModal({
          title: '提示！',
          content: '密码错误',
        })
      }
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
    console.log(token)
   // console.log(describe, dataList, total)
    //判断支付方式
    if(way=="wxpay"){
       //调取微信支付接口
       console.log("微信支付！")
      httpReq({
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method:'POST',
        data: {token, member_id, address_id, or_remark: describe, pay_type: way, cart_id},
        url: ApiUrl.phplist+'order/goodsPay',      //线上
        // url:'http://www.ylb.com/api/order/goodsPay'   //线下
      }).then((res) => {
        console.log(res)
        var timeStamp = res.data.lists.timeStamp
        var nonceStr = res.data.lists.nonceStr
        var pack = res.data.lists.package
        var paySign = res.data.lists.paySign
          //判断返回值，若为真
        //console.log(timeStamp,nonceStr,pack,paySign)
          if(res.statusCode==200){
            wx.login({
              success: function (res) {
                console.log(res)
                if (res.code) {
                    //真正支付的接口
                    wx.requestPayment({
                      timeStamp: timeStamp,
                      nonceStr: nonceStr,
                      package: pack,
                      signType: 'MD5',
                      paySign: paySign,
                      success: function (res) {
                        // success
                        
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
                } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
                }
              }
            })
          }
      })
    }else if(way=="qianbao"){
      var state=this.data.state
      state=!state
      this.setData({
        state
      })
      //确认密码
 

      //采用钱包余额支付
      // httpReq({
      //   header: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },
      //   method:'POST',
      //   data: { token, member_id, address_id, or_remark: describe, pay_type: way, cart_id},
      //   url: ApiUrl.phplist +'order/goodsPay',
      // }).then((res) => {
      //    console.log(res)
      // });
    }
   

  },
  pickChange: function (e) {
    console.log(this.data.datalist)
    console.log(e)
    var that=this
    if (this.data.datalist==""){
      wx.showModal({
        title: '提示',
        content: '附近没有经销商，请重新选择！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false
    }else{
      var id = this.data.datalist[e.detail.value].id
      this.setData({
        index: e.detail.value,
        id
      })
    }
   
   
    //将经销商的id传给后端
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
    qqmapsdk = new QQMapWX({
    key: 'KXRBZ-VZARV-YUYPW-USY6I-A7FIF-3ZBT4'
      // key:"fUTYRyEHz0nj0pmd7cz6gqBxbERz3BUy"
  })
var that = this
var address = this.data.defAddress
console.log(address)
var token = wx.getStorageSync('token')
var member_id = wx.getStorageSync('vipid')
qqmapsdk.geocoder({ //获取目标地址的地图信息，把详细地址输入address即可
  address: wx.getStorageSync('defAddress').address,
  success: function (res) {    //返回的数据里面有该地址的经纬度
    console.log(res.result.location.lat)
    var lat = res.result.location.lat
    var lon = res.result.location.lng
    //请求接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/deliverAddress?token=' + token + '&lon=' + lon + '&lat=' + lat + '&member_id=' + member_id+'&address='+wx.getStorageSync('defAddress').address,
    }).then((res) => {
      console.log(res)
      if (res.data.msg == "操作成功") {
        httpReq({
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: "POST",
          data: { token, lon, lat, member_id },
          url: ApiUrl.phplist + 'member/getDistance',
        }).then((res) => {
          console.log(res)
          var datalist = res.data.lists

          var arr = []
          for (let i = 0; i < datalist.length; i++) {
            var obj = {}
            obj.nickname = datalist[i].distance + ',' + datalist[i].nickname
            obj.id = datalist[i].id
            obj.name = datalist[i].nickname
            arr.push(obj)
          }
          console.log(arr)

          that.setData({
            datalist: arr
          })
          console.log(that.data.datalist)
        });

      }
    });
  },
  fail: function (res) {
    console.log(res)
    console.log("接口调用失败返回的回调")
  },
  complete: function (res) {
    console.log("接口调用结束的回调函数（调用成功、失败都会执行）")
  }
});


    var token = wx.getStorageSync('token')
    var member_id = wx.getStorageSync('vipid')
    var type = 1
    //请求默认地址接口
    var that = this
    console.log(token, member_id)
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/getSelectedAddress?token=' + token + '&member_id=' + member_id + '&type=' + type,
    }).then((res) => {
      console.log(res)
      var defAddress = res.data.lists
      console.log(defAddress)
      if (defAddress == undefined) {
          this.setData({
            defAddress:""
          })
        return false
      } else {
        var address_id = res.data.lists.id
        that.setData({
          defAddress,
          address_id
        })
        wx.setStorageSync('defAddress', defAddress)
        console.log(this.data.defAddress)
      }

      // console.log(this.data.defAddress)
    });
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