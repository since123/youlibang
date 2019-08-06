//pages/shoppingcart/shoppingcart.js
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
    // this.setData({
    //   hasList: true,        // 既然有数据了，那设为true吧
    //   carts: [
    //     { id: 0, title: '新西兰A2脱脂高钙儿童学生成人奶1kg...', image: '../../images/kefu@2x.png', num: 4, price: 119.00, selected: true },
    //     { id: 1, title: '新西兰A2脱脂高钙儿童学生成人奶1kg...', image: '../../images/kefu@2x.png', num: 1, price: 119.00, selected: true }
    //   ]
    // });
   
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
    //请求接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: "http://www.ylb.com/api/cart/getcart",
    }).then((res) => {
      console.log(res)
      var dataList = res.data.lists
      console.log(dataList)
      //进行数据重组
      var arr = []
      console.log(arr)
      for (let i = 0; i < dataList.length; i++) {
        var obj = {}
        obj.id = dataList[i].goods_id
        obj.title = dataList[i].goods_name
        obj.num = dataList[i].number
        obj.price = 2
        obj.selected = true
        arr.push(obj)
      }

      console.log(arr)
      that.setData({
        hasList: true,
        carts: arr
      })
      console.log(this.data.carts)
      //获取本地存储
      // wx.getStorage({
      //   key: 'shop',
      //   success: function (res) {
      //     console.log(res)
      //     var arr = res.data
      //     var carts = that.data.carts
      //     //循环添加
      //     for (let i = 0; i < arr.length; i++) {
      //       var array = arr[i] 
      //       carts.push(array)
      //     }
      //     //重新赋值
      //     that.setData({
      //       carts
      //     })
      //   },
      // })
      //同步成功
      try {
        var value = wx.getStorageSync('shop')
        if (value) {
          var arr = value
          var carts = this.data.carts
          //循环添加
          for (let i = 0; i < arr.length; i++) {
            var array = arr[i] 
            carts.push(array)
          }
          this.setData({
            carts
          })
        }
        //若同步失败，本地存储内没有值
      } catch (e) {
          console.log(e)
      }
      //console.log(carts.length)
      
      this.getTotalPrice()
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

  },
  //结算
  search: function () {
    var total=this.data.totalPrice
    var carts=this.data.carts
    console.log(carts)
    wx.navigateTo({
      url: '../submitOrder/submitOrder?totalPrice='+carts+'&total='+total,
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

    let carts = that.data.carts;   // 获取购物车列表
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


