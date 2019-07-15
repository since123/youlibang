//index.js
//获取应用实例
const app = getApp()
var goods = null;
var goodsID = null;
Page({
  data: {
    images: [],
    col1: [],
    movies: [{
        url: '/images/2012031220134655.jpg',
        link: ''
      },
      {
        url: '/images/2013062320262198.jpg',
        link: ''
      },
      {
        url: '/images/82bOOOPICcb.jpg',
        link: ''
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {

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
    console.log('goodsId' + goodsId)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+goodsId,
    })
  },
  onLoad: function(options) {
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
    });
    this.loadImages();
  },
  //商品信息列表显示
  loadImages: function() {
    this.setData({
      // hasList: true, // 既然有数据了，那设为true吧
      col1:[{
        goodsId: 0,
        goodsInfo: '新西兰A2脱脂高钙儿童学生成人高钙奶粉1kg...',
        url: 'bill',
        imageurl: '/images/2012031220134655.jpg',
        newprice: "86",
      
      },
      {
        goodsId: 1,
        goodsInfo: '新西兰A2脱脂高钙儿童学生成人高钙奶粉1kg...',
        url: 'bill',
        imageurl: '/images/2013062320262198.jpg',
        newprice: "92",
      },
      {
        goodsId: 2,
        goodsInfo: '新西兰A2脱脂高钙儿童学生成人高钙奶粉1kg...',
        url: 'bill',
        imageurl: '/images/2013062320262198.jpg',
        newprice: "128",
      }
    ]
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