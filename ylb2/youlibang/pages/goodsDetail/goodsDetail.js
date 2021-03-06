// pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:{},
    num:1,
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
    type1: [{ color: '豆绿色' }, { color: '红色' }, { color: '黄色' }, { color: '粉红色' }, { color: '奶白色' }, { color: '奶白色' }],
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
    console.log(e);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000,
    });
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  //立即购买
  buyNow: function() {
    var status = this.data.status;
    // console.log("触发了点击事件，弹出toast")
    status = !status;
    this.setData({
      status: status
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
    var goodsId = options.goodsId;
    console.log(goodsId)
    console.log(this.data.productsList[goodsId])
    this.setData({
      //  showprice:this.data.productsList.newprice,
      // showImg: this.data.productsList.img,
      // showDesc: this.data.productsList.desc,
      // showyuanjia:this.date.productsList.yuanjia,
      // showyunfei: this.date.productsList.yunfei,
     param:this.data.productsList[goodsId]
    })
    console.log(this.data.param)
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