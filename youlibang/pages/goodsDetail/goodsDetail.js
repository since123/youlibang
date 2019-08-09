// pages/goodsDetail/goodsDetail.js
import {
  httpReq
} from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:{},
    num:1,
    newarr:[],
    status: false,
    is_shoucang: 0,
    // goods_info: {
    //   goodsId: 1,
    //   // goods_title: "商品标题1",
    //   // goods_price: '100',
    //   // goods_yunfei: 0,
    //   // content: '商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情'
    // },
    goods_img: [{
        'img': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        'img': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        'img': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        'img': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
    ],
    // showDesc:'',//商品描述
    // showprice: '',
    // showyuanjia: '',
    // showyunfei: '',
    type1: [{ color: '豆绿色' }, { color: '红色' }, { color: '黄色' }, { color: '粉红色'}, { color: '奶白色'}, { color: '奶白色'}],
    idx:"",
    size:"",
    //定义选择的商品
    price:"",
    type2: [{ size: 'M' }, { size: 'L' }, { size: 'XL' }, { size: 'XXL' }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    productsList:[
      {
        goodsId:0,
        imageurl:'',
        goodsinfo: '澳洲进口新鲜效期蓝胖子美可Maxigene犬只成人奶粉1kg', 
        newprice:'86',
        yuanjia:'168',
        yunfei:'免运费'
      },
      {
        goodsId:1,
        imageurl:'',
        goodsinfo:'hfdskahslfdjdkslajflas;jlfd',
        newprice:'92',
        yuanjia:'199',
        yunfei:'10元'
      }
      ]
  },
  //事件处理
  //点击查看购物车
  shopcar(){
  console.log(1111)
   wx.switchTab({
     url: '../shoppingCart/shoppingCart',
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
    var yd = e._relatedInfo.anchorTargetText
    this.setData({
      yd,
      idx
    })
 
  },
  getVal(e){
    console.log(e)
    var idex = e.currentTarget.dataset.index + 1
    var wd = e._relatedInfo.anchorTargetText
    this.setData({
      wd,
      idex
    })
  },
  getVa(e) {
    console.log(e)
    var sx = e.currentTarget.dataset.index + 1
    var cd = e._relatedInfo.anchorTargetText
    this.setData({
      cd,
      sx
    })
  },
 
  //点击确定
  confirm(){
    var that = this
    //是否选择
    if (this.data.yd == "" || this.data.wd == ""||this.data.cd==""){
      return false
    }
    var productsList=this.data.productsList
   console.log(productsList)
    //重组数据
    var obj={}
    obj.goods_introduce = productsList.goods_introduce
    obj.id=productsList.id
    obj.goods_name = productsList.goods_name
    obj.yd = this.data.yd
      obj.wd=this.data.wd
      obj.cd=this.data.cd
      obj.selected=true
      obj.num=this.data.num
      obj.price=this.data.price
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
    var info = JSON.stringify(data)
    console.log(info)
    var bar=this.data.newarr
    console.log(bar)
    //判断点击的是加入还是立即购买
    if (this.data.state == 0) {
      console.log("去到购物车！")
      wx.setStorage({
        key: 'shop',
        data: bar,
      })
      wx.showToast({
        title: '添加成功！',
      })
    } else if (this.data.state == 1) {
      console.log("去到提交订单！")
      
      wx.navigateTo({
        url: '../submitOrder/submitOrder?info='+info,
      })
    }
    
  },
  //输入数量
  bindManual(e){
     var num=e.detail.value
     console.log(num)
     this.setData({
       num
     })
  },

  previewImage: function(e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
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
      url: 'http://www.ylb.com/api/goods/getdetail',
    }).then((res) => {
      console.log(res)
      var productsList=res.data.lists
      this.setData({
        productsList
      })
      var goodsInfo = productsList.goods_attr_ids
      for(let i=0;i<goodsInfo.length;i++){
       var data= goodsInfo[i].attr_values.split(",")
        goodsInfo[i].attr_values=data
      }
      var price = productsList.goods_price
      console.log(goodsInfo)
      var arr1 = goodsInfo[0].attr_values
      var arr2 = goodsInfo[1].attr_values
      var arr3 = goodsInfo[2].attr_values
      this.setData({
        goodsInfo,
        arr1,
        arr2,
        arr3,
        price
      })
      console.log(this.data.arr3)
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