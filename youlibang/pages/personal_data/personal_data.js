// pages/personal_data/personal_data.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
// var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipid: '',
    src: '',
    name:'',
    bindphone:'',
    sex:'',
    wechat:'',
    tuijianID:'',
    idCard1:'',
    idCard2:'',
    businesslicense:'',
    token: '',
    region: ['湖北省', '武汉市', '洪山区'],
    customItem: '全部',
    address: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPersonalInfo()
 
  },
//修改地址
  getUserAddress() {
    wx.navigateTo({
      url: '../userAddress/userAddress',
    })
  },
  
  //获取页面数据
  getPersonalInfo() {
    var that = this;
    let inform = wx.getStorageSync('inform')
    let sex = wx.getStorageSync('userInfo').gender
    console.log(sex)
    //性别 0：未知、1：男、2：女
    switch (Number(sex)) {
      case 0:
        that.setData({
          sex: '未知'
        })
        break;
      case 1:
        that.setData({
          sex: '男'
        })
        break;
      case 2:
        that.setData({
          sex: '女'
        })
        break;
    }
    //会员信息
    if (inform.vipid) {
      that.setData({
        src: inform.userImg_url,
        name: inform.vipname,
        bindphone: inform.mobile,
        address: wx.getStorageSync('fullAddress') == '' ? inform.address : wx.getStorageSync('fullAddress'),
        tuijianID: Number(inform.inviter_id),
        idCard1: inform.card_one,
        idCard2: inform.card_two,
        businesslicense: inform.license,
      })
    } else {
      //普通用户信息
      that.setData({
        src: inform.userImg_url,
        name: inform.username,
        bindphone: inform.mobile,
        address: wx.getStorageSync('fullAddress') == '' ? inform.address : wx.getStorageSync('fullAddress'),
        tuijianID: Number(inform.inviter_id),
        // idCard1: inform.card_one,
        // idCard2: inform.card_two,
        // businesslicense: inform.license,
      })
    }
  },
 
  /**
   * 选择图像
   */
  changeImage: function(e) {
    let that = this
    wx.chooseImage({
      count: 1,//默认9f
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {//// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        //console.log(tempFilePaths)
        that.setData({
          src: tempFilePaths[0]
        })
        wx.uploadFile({
          url: ApiUrl.phplist + 'member/avaup?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid'),
          filePath: that.data.src,
          name: 'avatar',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          success(res) {
            console.log(res)
          }
        })
      },
    })
  },

  /**
   * 获取修改的input中的值
   */
  // getVipNameValue: function(e) {
  //   this.setData({
  //     name: e.detail.value
  //   })
  //   console.log(this.data.name)
  // },
  // getSexValue: function(e) {
  //   this.setData({
  //     sex: e.detail.value
  //   })
  //   console.log(this.data.sex)
  // },
  
  /**更新保存个人资料修改（红星星部分） */
  // changeAvatar: function (e) {
  //   //这里是上传操作
  //   //当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
  //   //这里调用后台的修改操作， tempFilePaths[0],是上面uploadFile上传成功，然后赋值到修改这里。
  //     httpReq({
  //       header: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       method: 'POST',
  //       url: ApiUrl.phplist + '',//真正修改操作,填写你们修改的API
  //     }).then((res) => {
  //       console.log(res)
  //       if (res.data.code == 200) {
  //         wx.showToast({
  //           title: '修改成功',
  //           icon: 'success',
  //           duration: 2500
  //         })
  //         //wx.uploadFile自已有一个this，我们刚才上面定义的let that = this 把this带进来
  //         that.setData({
  //           src: tempFilePaths[0]//要上传文件资源的路径
  //         });
  //       }
  //     })   
  // },

  // bindPhoneNumber: function(e) {
  //   console.log(e)
  //   wx.navigateTo({
  //     url: '../../pages/bindphoneNum/bindphoneNum',
  //   })
  //   var detail = e.detail;
  //   wx.request({
  //     url: '',  //解密手机号码接口
  //     data: {
  //       // "appid": ,
  //       // "session_key": wx.getStorageSync('session_key'),
  //       // "encryptedData": detail.encryptedData,
  //       // "iv": detail.iv
  //     },
  //     success: function (res) {
  //       console.log(res.data.phoneNumber);
  //       wx.setStorageSync("phonenumber", res.data.phoneNumber);
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad()
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