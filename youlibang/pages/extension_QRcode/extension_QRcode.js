// pages/extension_QRcode/extension_QRcode.js
import {
  httpReq
} from '../../utils/http.js';
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
     var member_id=wx.getStorageSync('vipid')
     this.setData({
       userName,
       vipid:member_id
     })
     console.log(this.data.userName,this.data.vipid)
    //请求二维码
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url:'http://wx.ylbtl.cn/api/member/qcodelist?member_id='+member_id,
    }).then((res) => {
      console.log(res)
      var imgUrl=res.data.lists
      console.log(imgUrl)
      imgUrl = imgUrl.replace(/\\/g, "/") //正则替换
      console.log(imgUrl)
      this.setData({
        imgUrl
      })
      //采用死数据实现逻辑
      // var imgUrl = 'https://img2.woyaogexing.com/2019/08/16/b6a7142ae8ef43ca83524fc69043ca58!400x400.jpeg'
      // this.setData({
      //   imgUrl
      // })
    });
   var userImg=wx.getStorageSync('userInfo').avatarUrl
   //console.log(userImg)
   this.setData({
     userImg
   })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //事件处理
  upload(e){
    
    var way = e._relatedInfo.anchorTargetText
    console.log(way)
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
          //判断用户点击的是保存还是分享
          if(way=='保存图片'){
            that.savePhoto()
          }else{
            wx.showShareMenu({
              withShareTicket: true,
              success(){
                  console.log('分享成功！')
                  that.savePhoto()
                  //调取微信朋友圈接口
              },
              fail(){
                console.log('分享失败')
              }
            })
          }
           
          }
        }
      })


    

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