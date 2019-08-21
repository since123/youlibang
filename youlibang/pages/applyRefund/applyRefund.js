// pages/applyRefund/applyRefund.js
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
    status: true,
    refundImage: '',
    goods:[
      {
        src: '../../images/kefu (2).png',
        title: '好看的耳机质量好的耳机价格贵的耳机',
        properties: '黑色，L, 高级'
      },{
        src: '../../images/headImg.png',
        title: '好看的耳机质量好的贴纸价格贵的贴纸',
        properties: '红色，L, 好看'
      }],
    reasons: [
      {
        name: '拍错/多拍/不想要',
        value: '1'
      },{
        name: '协商一致退款',
        value: '2'
      },{
        name: '缺货',
        value: '3'
      },{
        name: '未按约定时间发货',
        value: '4'
      },{
        name: '其他',
        value: '5'
      },
    ]
  },
  /**
   * 请选择
   */
  getReason: function() {
    this.setData({
      status: false,
    })
  },
  /**
   * 控制幕布
   */
  showDetail: function() {
    this.setData({
      status: true,
    })
  },
  /**
   * 选择退款原因
   */
  chooseReason: function(e) {
    console.log(e.detail.value)
  },
  /**
   * 上传图片
   */
  uploadImage: function() {
    let that = this
    wx.chooseImage({
      count: 6,//默认9f
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {//// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
      },
    })
  },
  /**
   * 提交退款信息
   */
  submit: function() {
    
  },
  /**
   * 获取退款订单
   */
  getRefundOrider: function() {
    console.log(orderid)
    httpReq: ({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + '',
    }).then((res) => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let orderid = options.orderid
    if (orderid) {
      //获取退款订单
      // this.getRefundOrider()
    } else {
      console.log('没有获取到订单编号')
    }
    
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