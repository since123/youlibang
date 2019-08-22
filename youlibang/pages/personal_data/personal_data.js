// pages/personal_data/personal_data.js
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
    userInfo: [],
    vipid: '',
    src: '../../images/headImg.png',
    vipname:'蜡笔小新',
    bindphone:'13589068345',
    sex:'男',
    address:'广州市天河区',
    wechat:'Ly34983753',
    tuijianID:'23749374930',
    idCard1:'../../images/idCard@2x.png',
    idCard2:'../../images/idCardbg@2x.png',
    businesslicense:'../../images/Business_license@2x.png',
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPersonalInfo()
    this.setData({
      token: wx.getStorageSync('token'),
    })
  },
  //获取页面数据
  getPersonalInfo() {
    var that = this;
    let inform = wx.getStorageSync('inform')
    //性别 0：未知、1：男、2：女
    switch (Number(inform.sex)) {
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
    this.setData({
      src : inform.userImg_url,
      vipname : inform.username,
      bindphone :  inform.mobile,
      address : inform.address,
      tuijianID : inform.inviter_d,
      idCard1 : inform.card_one,
      idCard2 : inform.card_two,
      businesslicense : inform.license,
    })
    
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
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          src: tempFilePaths[0]
        })
        // console.log(that.data.src)
      },
      radioChange: function (e) {  
        console.log('radio发生change事件，携带value值为：', e.detail.value)
      },

    })
  },

  /**
   * 获取修改的input中的值
   */
  getVipNameValue: function(e) {
    this.setData({
      vipname: e.detail.value
    })
    console.log(this.data.vipname)
  },
  getSexValue: function(e) {
    this.setData({
      sex: e.detail.value
    })
    console.log(this.data.sex)
  },
  /**更新保存个人资料修改（红星星部分） */
  changeAvatar: function (e) {
    //这里是上传操作
    wx.uploadFile({
      url: '', //里面填写你的上传图片服务器API接口的路径
      filePath: this.data.src,//要上传文件资源的路径，此处只有一张，为数组第一项， String类型 
      name: '',//按个人情况填写，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      
      formData: {
        // HTTP 请求中其他额外的 form data
        nickname: this.data.vipname,
        sex: this.data.sex
        //和服务器约定的token, 一般也可以放在header中
        // 'session_token': wx.getStorageSync('session_token')
      },
      success: function (res) {
        const data = res.data
        //当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
        if (res.statusCode = 200) {
          // var data = res.data
          // var statusCode = res.statusCode
          // console.log("返回值1" + data);
          // console.log("返回值2" + statusCode)
          //这里调用后台的修改操作， tempFilePaths[0],是上面uploadFile上传成功，然后赋值到修改这里。
          httpReq({
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            method: 'POST',
            url: ApiUrl.phplist + '',//真正修改操作,填写你们修改的API
          }).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2500
              })
              //wx.uploadFile自已有一个this，我们刚才上面定义的let that = this 把this带进来
              that.setData({
                src: tempFilePaths[0]//要上传文件资源的路径
              });
            }
          })
        }
      }
    })
  },
  bindPhoneNumber: function(e) {
    wx.navigateTo({
      url: '../../pages/bindphoneNum/bindphoneNum',
    })
    var detail = e.detail;
    wx.request({
      url: '',  //解密手机号码接口
      data: {
        // "appid": ,
        // "session_key": wx.getStorageSync('session_key'),
        // "encryptedData": detail.encryptedData,
        // "iv": detail.iv
      },
      success: function (res) {
        console.log(res.data.phoneNumber);
        wx.setStorageSync("phonenumber", res.data.phoneNumber);
      }
    })
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