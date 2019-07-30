// pages/myAddress/myAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      {index:'0',username: '张兰', tel: '12345678910', address:'广东省广州市天河区汇诚大厦365',status:1},
      { index: '1', username: '哆啦A梦', tel: '12345678910', address: '广东省广州市天河区汇诚大厦365',status:0}
    ],
    address: '',
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var arr = wx.getStorageSync('addressList') || [];
    // console.info("缓存数据：" + arr);
    // // 更新数据  
    // this.setData({
    //   addressList: arr
    // });
  },
  //新增地址
  addAddress:function(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //编辑收货地址
  editAddress: function () {
    wx.navigateTo({
      url: '../editAddress/editAddress',
    })
  },
  //删除地址
  deleteAddress: function (e) {
    var that = this;
    var index=e.currentTarget.dataset.index;
    var addressList = that.data.addressList;
    // addressList.splice(index, 1);
    // that.setData({ 
    //   addressList: addressList 
    //   }); 
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          addressList.splice(index, 1);
          // 用户点击了确定 可以调用删除方法了
          // deleteInfo();
        } else if (res.cancel) {
          return false;
          console.log('用户点击取消')
        }
        that.setData({
          addressList: addressList
        });
        wx.request({
          url: '',
          data: {
            // linkname: linkname,
            // moblie: moblie,
            // addressdetail: addressdetail,
            // region: region,
            //改为需要传到后台的数据
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data);
          }

        })
      },
    
    })

  },
  //删除方法
  // deleteInfo: function (e) {
  //   this.data.addressList.splice(e.target.id.substring(3), 1);
  //   // 更新data数据对象  
  //   if (this.data.addressList.length > 0) {
  //     this.setData({
  //       addressList: this.data.addressList
  //     })
  //     wx.setStorageSync('addressList', this.data.addressList);
  //   } else {
  //     this.setData({
  //       addressList: this.data.addressList
  //     })
  //     wx.setStorageSync('addressList', []);
  //   }
  // },


  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();

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