// pages/onlineService/onlineService.js
var app=getApp();
var SocketOpen=false;
var userId='';
var openid='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false,
    user_input_text:'',//用户输入文字
    inputvalue:'',//输入值
    returnvalue:'',//返回值
    time:'',
    is_send:'',
    num:0,
    infolist: [{userheadImg:'../../images/2012031220134655.jpg',infos:'你好，有什么需要帮助？',states:0},
      { userheadImg: '../../images/2012031220134655.jpg', infos: '你好，退款未到账', states:0 }],
    allContentList: [{}, { is_ai: [] }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if(wx,wx.getStorageSync(openid)){
        this.setData({
          login:false
        })
    }else{
        this.setData({
          login: true
        })
    }

    // wx.request({
    //   url: '', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   method:'post',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
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
  //点击进行跳转
  question(e){
    console.log(e)
    var id=e.target.dataset.id
    console.log(id)
  wx.navigateTo({
    url: '../questionDetail/questionDetail?id='+id,
   
    })
  },
  //发送
  sendto:function(e){
    console.log('发送信息');
    console.log(e);
    var that=this;
    var data = {
      avatarUrl: wx.getStorageSync('avatarUrl'),
      iv: wx.getStorageSync('openid'),
      inputValue: that.data.inputValue,
      time: (new Date()).getTime(),
    }
    if (that.data.inputValue == "") {
      return;
    }
    console.log('提交信息',data)


  },
  bindkeyinput:function(e){
    console.log(e);
    if (e.detail.value == "") {
      this.setData({
        is_send: false,
        inputValue: e.detail.value
      })
    } else {
      this.setData({
        is_send: true,
        inputValue: e.detail.value
      })
    }
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