//pages/shoppingcart/shoppingcart.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
var goodsId=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: "",           // 总价，初始为0
    selectAllStatus: true    // 全选状态，默认全选
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    //拿到对应的token
  var token=wx.getStorageSync('token')
  console.log(token)
  this.setData({
    token
  })
    console.log(this.data.carts)
   
     this.getTotalPrice()
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
    var that = this
    var token = this.data.token
    var member_id = wx.getStorageSync('vipid')
    //请求接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist+"cart/getcart?token=" + token + '&member_id=' + member_id,
    }).then((res) => {
      console.log(res)
      if (res.data.lists == undefined) {
         that.setData({
           cart:""
         })
        wx.showModal({
          title: '亲',
          content: '购物车空空如也呢！',
        })

      } else {

        console.log(res)
        var dataList = res.data.lists
        console.log(dataList)
        //进行数据重组
        var arr = []
        //console.log(arr)
        for (let i = 0; i < dataList.length; i++) {
          var obj = {}
          obj.id = dataList[i].goods_id
          obj.title = dataList[i].goods_name
          obj.num = dataList[i].number
          obj.price = dataList[i].goods_price
          obj.selected = true
          obj.way = '结算'
          obj.cart_id = dataList[i].id
          obj.img = ApiUrl.url+dataList[i].goods_logo
          // obj.yd = dataList[i].goods_attr_values
          arr.push(obj)
        }
         
        console.log(arr)
        that.setData({
          hasList: true,
          carts: arr,
          selectAllStatus: true 
        })

      }

      //console.log(carts.length)

      this.getTotalPrice()


    });


  },
  toGoods(e) {
    console.log(e)
    var goodsId = e.currentTarget.dataset.goods_id
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (e) {

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

  },
  //结算
  search: function () {
    var total=this.data.totalPrice
    var carts=this.data.carts
    //console.log(carts)
   var num=0
   //判断购物车中的商品是否有被选中
     for(let i=0;i<carts.length;i++){
         if(carts[i].selected==false){
             num++
         }
     }
     console.log(num)
     if(num>=carts.length){
      wx.showModal({
        title: '亲',
        content: '请至少选择一项商品！',
      })
       return false
     }
   let info=carts.filter((v)=>{
         if(v.selected==true){
           return v
         }
   })
   console.log(info)
   info=JSON.stringify(info)
    console.log(info)
    wx.navigateTo({
      url: '../submitOrder/submitOrder?info='+info,
    })
  },
  //封装的计算总价方法
  getTotalPrice() {
    //console.log(this.data.carts.length)
    let carts = this.data.carts; 
    //console.log(carts)   
    //console.log(carts.length)              // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      //console.log(carts.length)         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;     // 所有价格加起来
        console.log(carts[i].num,carts[i].price)
      }
    }
    console.log(total)
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    })
    console.log(total)
  },
  //选择事件
  selectList(e) {
    
    var that = this;
    const index = e.currentTarget.dataset.index;// 获取data- 传进来的index
     console.log(index)
    let carts = that.data.carts;   // 获取购物车列表
    console.log(carts)
    that.data.selectAllStatus = true; //默认是全选                
    let selected = carts[index].selected; // 获取当前商品的选中状态
    carts[index].selected = !selected
    for (let i = 0; i < carts.length; i++) {            // 改变所有商品状态
      if (!carts[i].selected) {//判断单个商品是否是选中状态
        that.data.selectAllStatus = false
        break;
      }
    }
    this.setData({
      carts: carts,
      selectAllStatus: that.data.selectAllStatus
    });
    console.log(this.data.carts)
    this.getTotalPrice();                           // 重新获取总价
 
  },
  //点击全部选择事件
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  }

})


