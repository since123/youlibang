// pages/onlineService/onlineService.js
import {
  ApiUrl
} from '../../utils/apiurl.js';
import {
  httpReq
} from '../../utils/http.js';
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
    infolist: [],
    header:[
      // '如何修改退款，售后申请？',
      // '收到商品有质量问题怎么解决？',
      // '退款后钱款退到哪里？',
      // '如何申请退款？'
    ]
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
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist +'user/getCall',
    }).then((res) => {
      console.log(res)
      var header=res.data.lists
      for(let i=0;i<header.length;i++){
        header[i].site=false
      }
      this.setData({
        header
      })
    });
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
     var index=e.currentTarget.dataset.index
    var header=this.data.header
     
    var obj = {}
    obj.userheadImg = '../../images/2012031220134655.jpg'
    obj.infos = header[index].answer
    obj.states = 0
    var infolist = this.data.infolist
    infolist.push(obj)
    this.setData({
      infolist
    })

  },
  //发送
  sendto:function(e){
    console.log('发送信息');
    console.log(e);
    var info=this.data.inputvalue
    console.log(info)
    if(info==''){
      return
    }
    var datamsg=this.data.infolist
    var object={}
    object.userheadImg = wx.getStorageSync('userInfo').avatarUrl
    object.infos = info
    object.states = 1
   datamsg.push(object)
   this.setData({
     infolist:datamsg
   })
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
    //请求在线客服接口
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url:ApiUrl.phplist+'user/searchCall?questions='+info,
    }).then((res) => {
     console.log(res)
     var answer=res.data.msg
       //console.log(answer)
       var obj={}
      obj.userheadImg = '../../images/2012031220134655.jpg'
      obj.infos=answer
      obj.states=0
      var infolist=this.data.infolist
      infolist.push(obj)
      this.setData({
        infolist
      })
    })
    this.setData({
      inputvalue: ''
    })

  },
  bindkeyinput:function(e){
    console.log(e);
    var inputvalue=e.detail.value
    this.setData({
       inputvalue
    })
    // if (e.detail.value == "") {
    //   this.setData({
    //     is_send: false,
    //     inputValue: e.detail.value
    //   })
    // } else {
    //   this.setData({
    //     is_send: true,
    //     inputValue: e.detail.value
    //   })
    // }
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