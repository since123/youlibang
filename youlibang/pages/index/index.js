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
  changePath(e) {
  
    var id=e.target.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id='+id,

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
    var goodsId=e.currentTarget.dataset.goodsid;
    // console.log(goodsId);
    // console.log('goodsId' + goodsId);
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+goodsId,
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
      url: 'http://www.ylb.com/api/goods/index'
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
      url: 'http://www.ylb.com/api/goods/index'
    }).then((res) => {
         console.log(res)
         //处理商品信息
         var dataLists=res.data.lists
         dataLists=dataLists.slice(0,3)
         this.setData({
           col1:dataLists
         })
    })
     //处理通知栏
    var that = this;
       goodsID = options.goodsID;
    this.setData({
      msgList: [{
          url: "url",
          title: "全员会员招募中，满1000送500，满500送200，详情咨询客服"
        },
        {
          url: "url",
          title: "交了20多年的国内漫游费将取消 你能省多少话费？"
        },
        {
          url: "url",
          title: "北大教工合唱团出国演出遇尴尬:被要求给他人伴唱"
        }
      ]
    })
   
  },
  //商品信息列表显示
  // loadImages: function() {
  //   this.setData({
  //     // hasList: true, // 既然有数据了，那设为true吧
  //     col1:[{
  //       goodsId: 0,
  //       goodsInfo: '新西兰A2脱脂高钙儿童学生成人高钙奶粉1kg...',
  //       url: 'bill',
  //       imageurl: '/images/2012031220134655.jpg',
  //       newprice: "86",
      
  //     },
  //     {
  //       goodsId: 1,
  //       goodsInfo: '新西兰A2脱脂高钙儿童学生成人高钙奶粉1kg...',
  //       url: 'bill',
  //       imageurl: '/images/2013062320262198.jpg',
  //       newprice: "92",
  //     },
  //     {
  //       goodsId: 2,
  //       goodsInfo: '新西兰A2脱脂高钙儿童学生成人高钙奶粉1kg...',
  //       url: 'bill',
  //       imageurl: '/images/2013062320262198.jpg',
  //       newprice: "128",
  //     }
  //   ]
  //   })
  // },

  getUserInfo: function(e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  }
})