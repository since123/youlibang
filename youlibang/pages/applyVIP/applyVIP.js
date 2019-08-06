// pages/applyVIP/applyVIP.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,//当前默认普通VIP
    currentRechargemoney: 100,//当前充值金额默认为100
    // recommendID: 0303030,
    frontID: '../../images/idCard@2x.png',
    backID: '../../images/idCardbg@2x.png',
    businessLicense: '../../images/Business_license@2x.png',
    imgList: [],
    inputID: '',
    ifhidden: true,
    informHidden: true,
    vipRules: [
      {
        userGrade: '普通VIP',
        rechargeMoney: 100,
        preferentialInfo: ''
      },{
        userGrade: '入门VIP',
        rechargeMoney: 500,
        preferentialInfo: '限额1000名'
      },{
        userGrade: '初级VIP',
        rechargeMoney: 1000,
        preferentialInfo: '充值可得免费铺货1000元'
      },{
        userGrade: '中级VIP',
        rechargeMoney: 1000,
        preferentialInfo: '充值可得免费铺货5000元'
      },
      {
        userGrade: '高级VIP',
        rechargeMoney: 3000,
        preferentialInfo: '充值可得免费铺货5000元'
      },
      {
        userGrade: '经销级VIP',
        rechargeMoney: 5000,
        preferentialInfo: '充值可得免费铺货5000元'
      },
      {
        userGrade: '特约经销VIP',
        rechargeMoney: 10000,
        preferentialInfo: '充值可得免费铺货5000元'
      },
      {
        userGrade: '总经销VIP',
        rechargeMoney: 20000,
        preferentialInfo: '充值可得免费铺货5000元充值可得免费铺货5000元充值可得免费铺货5000元充值可得免费铺货5000元充值可得免费铺货5000元'
      },

      ]
  },
  chooseGrade: function(e) {
    console.log(e)
    let rechargemoney = e.currentTarget.dataset.rechargemoney//获取当前充值金额
    // console.log(rechargemoney)
    let current = e.currentTarget.dataset.current;
    this.setData({
      currentIndex: current,
      currentRechargemoney: rechargemoney,
      informHidden:false
        //把获取的自定义current赋给当前组件的currentIndex(即获取当前组件)  
    })
    if (current > 3) {
      this.setData({
        ifhidden: false
      })
    } else {
      this.setData({
        ifhidden: true
      })
    }
     //获取自定义的current  
  },
  returnPage: function() {
    this.setData({
      informHidden: true
    })
  },
  changeFrontID: function() {
    let that = this
    wx.chooseImage({
      count: 1,//默认9f
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {//// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        that.setData({
          frontID: tempFilePaths[0]
        })
        // console.log(that.data.frontID)
         that.data.imgList.push(that.data.frontID)
      },
      radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
      },

    })
  },

  changeBackID: function() {
    let that = this
    wx.chooseImage({
      count: 1,//默认9f
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          backID: tempFilePaths[0]
        })
        that.data.imgList.push(that.data.backID)
      },
      radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
      },

    })
  },

  changeBusinessLicense: function() {
    let that = this
    wx.chooseImage({
      count: 1,//默认9f
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          businessLicense: tempFilePaths[0]
        })
        that.data.imgList.push(that.data.businessLicense)
      },
      radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
      },
    })
  },
  /**
   * 获取输入框(input)内容
   */
  getInput: function (e) {
    this.setData({
      inputID : e.detail.value
    })
  },
  applyClick: function() {
    wx.uploadFile({
      url: '', //里面填写你的上传图片服务器API接口的路径
      filePath: this.data.imgList,//要上传文件资源的路径，此处只有一张，为数组第一项， String类型 
      name: '',//按个人情况填写，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
      header: {

      },

      formData: {
        // HTTP 请求中其他额外的 form data
        currentIndex: this.data.currentIndex,
        currentRechargemoney: this.data.currentRechargemoney,
        inputID: this.data.inputID,
        //和服务器约定的token, 一般也可以放在header中
        'session_token': wx.getStorageSync('session_token')
      },
      success: function(res) {
        const data = res.data
        //当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
        if (res.statusCode = 200) {
          // var data = res.data
          // var statusCode = res.statusCode
          // console.log("返回值1" + data);
          // console.log("返回值2" + statusCode)
          //这里调用后台的修改操作， tempFilePaths[0],是上面uploadFile上传成功，然后赋值到修改这里。
          wx.request({
            url: '',
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            method: 'POST',
            success: function (res) {
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
            }
          })
        }
      }
    })
  },
  ifhidden: function() {
    ifhidden: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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