// pages/goodsDetail/goodsDetail.js
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
    isxianshi:true,
    param:{},
    num:1,
    newarr:[],
    status: false,
    is_shoucang: 0,
    goods_img: [
    ],
    type1: [],
    idx:"",
    size:"",
    //定义选择的商品
    price:"",
    type2: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    productsList:[
     
      ],
      arr1:[],
      arr2:[],
      arr3:[]
  },
  //事件处理
  //点击查看购物车
  shopcar(){
  //console.log(1111)
   wx.switchTab({
     url: '../shoppingcart/shoppingcart',
   })
  },
  //点击查看在线客服
  tokefu(){
    console.log(1111)
    wx.navigateTo({
      url: '../onlineService/onlineService',
    })
  },
  getValue(e) {
    console.log(e)
    var idx = e.currentTarget.dataset.index+1
    var yd = e.currentTarget.dataset.text

    this.setData({
      yd,
      idx,
    })
 
  },
  getVal(e){
    console.log(e)
    var idex = e.currentTarget.dataset.index + 1
    var wd = e.currentTarget.dataset.text

    this.setData({
      wd,
      idex,
    })
    
  },
  getVa(e) {
    console.log(e)
    var sx = e.currentTarget.dataset.index + 1
    var cd = e.currentTarget.dataset.text
   
    this.setData({
      cd,
      sx,
    
    })
  },
 
  //点击确定
  confirm(){
    var that = this
    //是否选择
    if(this.data.arr1!=""){
       if(this.data.yd==undefined){
         return false
          console.log(this.data.yd)
       }
    }
    if (this.data.arr2!= "") {
      if (this.data.wd == undefined) {
        return false
        console.log(this.data.wd)
      }
    }
    if (this.data.arr3!= "") {
      if (this.data.cd == undefined) {
        return false
        console.log(this.data.cd)
      }
    }
    if (this.data.num<=0){
      return false
    }
    var productsList=this.data.productsList
   console.log(productsList)
    //重组数据存入缓存
    var obj={}
    obj.goods_introduce = productsList.goods_introduce
    obj.id=productsList.id
    obj.goods_name = productsList.goods_name
    obj.yd = this.data.yd
      obj.wd=this.data.wd
      obj.cd=this.data.cd
      obj.selected=true
      obj.num=this.data.num
    obj.price =productsList.goods_price
      obj.way='立即购买'
      console.log(obj)
      var array=this.data.newarr
     array.push(obj)
     this.setData({
       newarr:array
     })
     console.log(this.data.newarr)

      //处理弹出层
      this.setData({
        status:false
      })
   
     var arr=[]
     
      arr.push(obj)
     console.log(arr)
    var data=arr
    console.log(data)
   // console.log(info)
    var bar=this.data.newarr
    console.log(bar)

    var token=wx.getStorageSync('token') //取得token
    var member_id=wx.getStorageSync('vipid') //取得member_id
    var user_id=wx.getStorageSync('userid')
    //重组数据提交后端
   
  var  goods_id = productsList.id
  var   goods_attr_values = productsList.goods_introduce
  var   goods_number = this.data.num
    console.log(token, member_id, goods_id, goods_attr_values, goods_number)
    console.log(this.data.yd)
    //不论是加入购物车还是立即购买调用相同的接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method:"POST",
      data: { token, goods_id, goods_attr_values: goods_attr_values+this.data.yd, goods_number, member_id, user_id},
      url: ApiUrl.phplist+'cart/savecart'
    }).then((res) => {
      console.log(res)
      if (res.statusCode!=500){
        wx.setStorageSync('vipid', res.data.lists.member_id)
      }
     
      //判断点击的是加入还是立即购买
      if (this.data.state == 0) {
        console.log("去到购物车！")
        //请求加入购物车数据
        wx.setStorage({
          key: 'shop',
          data: bar,
        })
        wx.showToast({
          title: '添加成功！',
        })

      } else if (this.data.state == 1) {
        if(wx.getStorageSync('vipid')==0){
          wx.showModal({
            title: '亲，非常抱歉呢',
            content: '请先成为会员再进行购买！',
          })
          return false
        }
        data[0].cart_id = res.data.lists.cart_id
        data[0].member_id = res.data.lists.member_id
        console.log(data)
        var info = JSON.stringify(data)
        console.log(info)
        wx.navigateTo({
          url: '../submitOrder/submitOrder?info=' + info,
        })
      }
    });
  },
  //输入数量
  bindManual(e){
     var num=e.detail.value
     console.log(num)
     this.setData({
       num
     })
  },
  changeIf(){
     var num=this.data.num
     if(num<=0){
       wx.showToast({
         title: '亲，输入有误！',
       })
     }
     return false
  },

  previewImage: function(e) {
    console.log(e)
    var current = e.target.dataset.src;
    var goodsimg = this.data.goods_img;
    console.log(goodsimg)
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = goodsimg[i].pics
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist // 需要预览的图片http链接列表  
    })
  },
  //加入购物车
  addCartBtn:function(e){
    var status = this.data.status;
    // console.log("触发了点击事件，弹出toast")
    status = !status;
    this.setData({
      status: status,
      state:0
    })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果

    
  },
  //立即购买
  buyNow: function() {
    var status = this.data.status;
    // console.log("触发了点击事件，弹出toast")
    status = !status;
    this.setData({
      status: status,
      state:1
    })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
    
  },

  toastHide: function(event) {
    // console.log("触发bindchange，隐藏toast")
    status = true
    this.setData({
      status: status
    })
  },
  quxiao: function() {
    // console.log(1);
    this.setData({
      status: false
    })
  },
  //点击减号
  bindMinus:function(){
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  //点击加号
  bindPlus:function(){
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    var goodsId = options.goodsId;
    console.log(goodsId)
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist+'goods/getdetail?goods_id='+goodsId,
    }).then((res) => {
      console.log(res)
      if(res.data.code!=10000){
        wx.showModal({
          title: '亲，非常抱歉呢',
          content: '没有该商品的信息',
        })
       
        return false
      }
      var productsList=res.data.lists
      var goods_img = productsList.good_imgs
      for(let i=0;i<goods_img.length;i++){
        goods_img[i].pics=ApiUrl.url+goods_img[i].pics
      }
      this.setData({
        productsList,
        goods_img
      })
      var goodsInfo = productsList.attr
      if(goodsInfo!=''){
        for (let i = 0; i < goodsInfo.length; i++) {
          var data = goodsInfo[i].attr_values.split(",")
          goodsInfo[i].attr_values = data
        }
        var price = productsList.goods_price
        console.log(goodsInfo)
        if (goodsInfo[0].attr_values!=undefined){
          var arr1 = goodsInfo[0].attr_values
          this.setData({
            arr1,
            goodsInfo
          })
        }
        if (goodsInfo[1].attr_values!=undefined){
          var arr2 = goodsInfo[1].attr_values
          this.setData({
            arr2,
            goodsInfo
          })
        }
        if (goodsInfo[2].attr_values != undefined) {
          var arr3 = goodsInfo[2].attr_values
          this.setData({
            arr3,
            goodsInfo
          })
        }
         
        this.setData({
          goodsInfo,
          price
        })
        console.log(this.data.arr1)
      }
     
    });
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
    //获取本地存储
    var that = this
    wx.getStorage({
      
      key: 'shop',
      success: function (res) {
        console.log(res)
        var datalist = res.data
        console.log(datalist)
        that.setData({
          newarr: datalist
        })
        console.log(that.data.newarr)
      }, fail: function (res) {
        console.log(res)
      }
    })
  
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