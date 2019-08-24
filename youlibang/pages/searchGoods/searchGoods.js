// pages/searchGoods/searchGoods.js
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
      value:"",
      state:true,
      status:false,
      searchGoods:[
       

      ],
      history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var history=wx.getStorageSync('search')
    if(history){
      this.setData({
        history
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取输入内容
  search(e){
   
    var value=e.detail.value
   
     this.setData({
       value
     })
   // console.log(this.data.value)
  },
  //点击跳转搜索详情
  searchPath(){
    //如果没输入
    if(this.data.value==""){
      return false
    }
    //获取搜索关键字
    var that=this
    var search=that.data.value
    var history=that.data.history
    console.log(typeof history)
    history.push(search)
    that.setData({
      history
    })
    wx.setStorageSync('search', history)
    console.log(search)
   //请求搜索接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url:ApiUrl.phplist+'goods/goodsearch?search='+search,
    }).then((res) => {
       console.log(res)
       var searchGoods=res.data.lists
       if(searchGoods==undefined){
          console.log("暂无数据匹配！")
          this.setData({
            searchGoods:[]
          })
          console.log(this.data.searchGoods)
       }else{
         let goods=searchGoods.map((v)=>{
           v.goods_name=v.goods_name.replace(search,"<b style='color:red'>"+search+"</b>")
           return v
         })
         console.log(goods)
         this.setData({
           searchGoods:goods,
           status: true,
         })
       }
       
    });

  },
   //点击查找
   dianji(e){
      //console.log(e)
     var inputvalue=e.currentTarget.dataset.text
     console.log(inputvalue)
    //请求接口

     httpReq({
       header: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       url: ApiUrl.phplist+'goods/goodsearch?search=' + inputvalue,
     }).then((res) => {
       console.log(res)
       var searchGoods = res.data.lists
       if (searchGoods == undefined) {
         console.log("暂无数据匹配！")
       } else {
         let goods = searchGoods.map((v) => {
           v.goods_name = v.goods_name.replace(inputvalue, "<b style='color:red'>" + inputvalue + "</b>")
           return v
         })
         console.log(goods)
         this.setData({
           searchGoods: goods,
           state: false,
           status: true
         
         })
       }

     });
    
   },
  goodsdetail(e){
    
    var id = e.currentTarget.dataset.goodsid
    console.log(id)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+id,
    })
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