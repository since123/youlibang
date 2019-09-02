// pages/extension_QRcode/extension_QRcode.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"",
    url:'https://wx.ylbtl.cn/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.imgUrl)
     var userName=wx.getStorageSync('userInfo')
     var member_id=wx.getStorageSync('vipid')
     var qcode=wx.getStorageSync('qcode')
     this.setData({
       userName,
       vipid:member_id,
       imgUrl:qcode
     })
     console.log(this.data.userName,this.data.vipid)
     //若二维码不存在，则请求对应的接口
     if(this.data.imgUrl==""){
       //请求二维码
       httpReq({
         header: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
         url: ApiUrl.phplist+'member/qcodelist?member_id=' + member_id,
        //  url:"https://wx.ylbtl.cn/api/member/qcodelist?member_id=" + member_id
       }).then((res) => {
         //console.log(res)
         if (res.statusCode==500){
          wx.showModal({
            title: '不可重复请求',
            content: '二维码已经生成',
          })
          return false
         }else{
           var imgUrl = res.data.lists
           console.log(imgUrl)
           imgUrl = imgUrl.replace(/\\/g, "/") //正则替换
           var index = imgUrl.lastIndexOf("u")
           console.log(index)
           var img = imgUrl.substr(index)
           console.log(img)
           var url=this.data.url
           imgUrl=url+img
           console.log(imgUrl)
           wx.setStorageSync('qcode', imgUrl)
         this.setData({
           imgUrl
         })

       }
        
       });
       var userImg = wx.getStorageSync('userInfo').avatarUrl
       //console.log(userImg)
       this.setData({
         userImg
       })

     }else{
       return false
     }
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //事件处理
  upload(e){
    
    var way = e.currentTarget.dataset.text
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
        
            that.savePhoto()
           
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