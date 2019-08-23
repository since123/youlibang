//index.js
//获取应用实例
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
    movies: [{
        url: '/images/2012031220134655.jpg',
        link: '',
        id:0
        
      },
      {
        url: '/images/2013062320262198.jpg',
        link: '',
        id:0
        
      },
      {
        url: '/images/82bOOOPICcb.jpg',
        link: '',
        id:1
      
      }
    ]
  },
  

  //事件处理函数
  bindViewTap: function() {

  },

  //点击图片进行跳转
  // changePath(e) {
  
  //   var id=e.target.dataset.id
  //   console.log(id)
  //   wx.navigateTo({
  //     url: '../goodsDetail/goodsDetail?goodsId='+id,

  //   })
  // },
 
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
  //上拉加载
  onReachBottom(){
    var that=this
   //重新请求接口
   if(that.data.state!=true){
        return false
   }
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: 'http://wx.ylbtl.cn/api/goods/index'
    }).then((res) => {
      console.log(res)
          this.setData({
            status:false,
            state:false
          })
      //处理商品信息
      var dataLists = res.data.lists
      this.setData({
        col1: dataLists
      })
    })
  },
  onLoad: function(options) {
   //请求接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: 'http://wx.ylbtl.cn/api/goods/index'
    }).then((res) => {
         console.log(res)
         //处理商品信息
         var dataLists=res.data.lists
         dataLists=dataLists.slice(0,3)
         this.setData({
           col1:dataLists
         })
    })
    //请求轮播图接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: 'http://wx.ylbtl.cn/api/Operatedata/imgList',
    }).then((res) => {
      console.log(res)
     //重置banner轮播图数据
      this.setData({
           movies:res.data.lists
      })
      console.log(this.data.movies)
    });

     //处理通知栏
    var that = this;
       goodsID = options.goodsID;
    //请求接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: 'http://wx.ylbtl.cn/api/operatedata/getlist?type=1'
    }).then((res) => {
     var dataList=res.data.lists
     console.log(dataList)
     this.setData({
       dataList
     })
    })
  },
 

  getUserInfo: function(e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  }
})