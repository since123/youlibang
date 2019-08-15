// pages/extension_QRcode/extension_QRcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var userName=wx.getStorageSync('userInfo')
     var vipid=wx.getStorageSync('vipid')
     this.setData({
       userName,
       vipid
     })
     console.log(this.data.userName,this.data.vipid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //事件处理
  upload(e){
    
    var way = e._relatedInfo.anchorTargetText
    console.log(way)
    //判断点击的是保存图片还是分享朋友圈
    if(way=='保存图片'){
      let that = this
      //若二维码未加载完毕，加个动画提高用户体验
      wx.showToast({
        icon: 'loading',
        title: '正在保存图片',
        duration: 1000
      })
      //判断用户是否授权"保存到相册"
      wx.getSetting({
        success(res) {
          //没有权限，发起授权
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {//用户允许授权，保存图片到相册
                that.savePhoto();
              },
              fail() {//用户点击拒绝授权，跳转到设置页，引导用户授权
                wx.openSetting({
                  success() {
                    wx.authorize({
                      scope: 'scope.writePhotosAlbum',
                      success() {
                        that.savePhoto();
                      }
                    })
                  }
                })
              }
            })
          } else {//用户已授权，保存到相册
            that.savePhoto()
          }
        }
      })


    }else{
       //执行分享逻辑
      





    }

  },
  savePhoto() {
    let that = this
    wx.downloadFile({
      url: that.data.imgUrl,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: "success",
              duration: 1000
            })
          }
        })
      }
    })
  },
  onReady: function () {

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