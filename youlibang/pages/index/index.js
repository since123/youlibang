//index.js
//获取应用实例
import {
  ApiUrl
} from '../../utils/apiurl.js';
import { httpReq} from '../../utils/http.js';
const app = getApp()
var goods = null;
var goodsID = null;
Page({
  data: {
    status:true,
    state:true,
    images: [],
    col1: [],
    movies: [
    ],
    page:0
  },
  

  //事件处理函数
  bindViewTap: function() {

  },

  //点击图片进行跳转
  changePath(e) {
  
    var id=e.target.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+id,

    })
  },
  //上一页
  last(){
     var page=this.data.page
     page<=0?0:page--
     console.log(page)
     //请求接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      data: { limit: page },
      url: ApiUrl.phplist + 'goods/index'
    }).then((res) => {
      console.log(res)
      if(res.data.lists==undefined){
           wx.showModal({
             title: '提示',
             content: '没有数据哦！',
           })
           return false
      }
      
      //处理商品信息
      var dataLists = res.data.lists
      //  dataLists=dataLists.slice(0,(dataLists.length)/2)
      for (let i = 0; i < dataLists.length; i++) {
        dataLists[i].goods_logo = ApiUrl.url + dataLists[i].goods_logo
      }
      //var url = 'https://wx.ylbtl.cn/uploads/logo/20190830/781eb22b64de81ae53ca26e4bc64c45f.jpg'
      this.setData({
        col1: dataLists,
        page
      })

    })
  },
  //下一页
  next(){
    var page=this.data.page
    //page判断条件
    page++
    console.log(page)
    //请求接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      data: { limit: page },
      url: ApiUrl.phplist + 'goods/index'
    }).then((res) => {
      console.log(res)
      //console.log(ApiUrl.url)
      //处理商品信息
      if(res.data.lists==undefined){
         wx.showModal({
           title: '提示',
           content: '已经到尾页了呢',
         })
        return false
      }
      var dataLists = res.data.lists
      //  dataLists=dataLists.slice(0,(dataLists.length)/2)
      for (let i = 0; i < dataLists.length; i++) {
        dataLists[i].goods_logo = ApiUrl.url + dataLists[i].goods_logo
      }
      //var url = 'https://wx.ylbtl.cn/uploads/logo/20190830/781eb22b64de81ae53ca26e4bc64c45f.jpg'
      this.setData({
        col1: dataLists,
        page
      })
     console.log(this.data.page)
    })

  },
 
  //搜索
  search: function() {
    wx.navigateTo({
      url: '../searchGoods/searchGoods',
    })
  },
  //购买
  tobuy: function(e) {
    var that=this;
    console.log(e)
    var goodsId=e.currentTarget.dataset.goodsid;
    // console.log(goodsId);
    // console.log('goodsId' + goodsId);
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+goodsId+'&buy=1',
    })
  },
  //商品详情
  goodsdetail: function(e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId);
    //console.log('goodsId' + goodsId)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+goodsId,
    })
  },
  onLoad: function(options) {
    var that = this;
    //请求接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'operatedata/getlist?type=1'
    }).then((res) => {
      console.log(res)
      if (res.data.lists == undefined) {
       
        return false
      }
      var dataList = res.data.lists
      console.log(dataList)
      this.setData({
        dataList
      })
      console.log(dataList)
    })
  },
 
   onShow:function(){
     var page = this.data.page
     //请求接口
     httpReq({
       header: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       method: "POST",
       data: { limit: page },
       url: ApiUrl.phplist + 'goods/index'
     }).then((res) => {
       console.log(res)
       //console.log(ApiUrl.url)
       //处理商品信息
       var dataLists = res.data.lists
       //  dataLists=dataLists.slice(0,(dataLists.length)/2)
       for (let i = 0; i < dataLists.length; i++) {
         dataLists[i].goods_logo = ApiUrl.url + dataLists[i].goods_logo
       }
       //var url = 'https://wx.ylbtl.cn/uploads/logo/20190830/781eb22b64de81ae53ca26e4bc64c45f.jpg'
       this.setData({
         col1: dataLists
       })

     })
     //请求轮播图接口
     httpReq({
       header: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       url: ApiUrl.phplist + 'Operatedata/imgList',
     }).then((res) => {
       console.log(res)
       //重置banner轮播图数据
       var dataLists = res.data.lists
       //  dataLists=dataLists.slice(0,(dataLists.length)/2)
       console.log(dataLists)
       for (let i = 0; i < dataLists.length; i++) {
         dataLists[i].url = ApiUrl.url + dataLists[i].url
       }
       this.setData({
         movies: dataLists
       })
       console.log(this.data.movies)
     });

     //处理通知栏
  
   },
  getUserInfo: function(e) {
  
  }
})