// pages/mine/mine.js
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
    userInfo: wx.getStorageSync('userInfo'),
    token: wx.getStorageSync('token'), //获取token进行验证并赋值
    username:'蜡笔小新',
    vipid:'0',
    userImg_url:'../../images/headImg.png',
    price:'0.00',
    encryptedData: wx.getStorageSync('encryptedData')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    //this.isMember()
    //console.log(wx.getStorageSync('vipid'))
    //验证用户
    if (wx.getStorageSync('token')) {
      if (wx.getStorageSync('userInfo') != '' && wx.getStorageSync('encryptedData') != '') {
       //判断vipid并缓存
        console.log('都授权成功')
        console.log(wx.getStorageSync('vipid'))
        if (Number(wx.getStorageSync('vipid')) != 0) {
          that.getVipUserInfo()  
        } else if (Number(wx.getStorageSync('vipid')) == 0){
          that.getPersonalInfo()
       } 
     } else {
       wx.showModal({
         title: '警告通知',
         content: '获得你的公开信息（昵称，头像，地区及性别）以及电话,在设置中确定重新获取授权',
         success: function(res){
           if (res.confirm) {
             wx.navigateTo({
               url: '../../pages/set/set',
             })
           } else if (res.cancel) {
             wx.navigateTo({
               url: '../../pages/mine/mine',
             })
           }
         }
       })
     }
   } else {
     console.log('token获取失败')
     return false
   }
    
  },
  
  /**是会员时，后台返回数据，展示会员信息信息 */
  getVipUserInfo: function() {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'member/memberDetail?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid'),
    }).then((res) => {
      console.log(res);
      let lists = res.data.lists
      let inform = {}
      inform.vipid = lists.id//会员ID
      inform.vipname = lists.nickname//昵称
      inform.userImg_url = lists.avatar//头像
      inform.price = Number(lists.can_rebate) + Number(lists.no_rebate) + Number(lists.user_money)//账户余额
      inform.usermoney = Number(lists.can_rebate) + Number(lists.user_money)//可提现全部余额
      inform.can_rebate = Number(lists.can_rebate)//可提现返利
      inform.mobile = lists.mobile//电话号码
      inform.address = lists.address//地址
      inform.inviter_id = lists.inviter_id//邀请id
      inform.sex = lists.sex//性别
      inform.card_one = lists.card_one//身份证正面
      inform.card_two = lists.card_two//身份证反面
      inform.license = lists.license//营业执照
      wx.setStorageSync('inform', inform)
     
      wx.setStorageSync('inform', inform)
      
      that.setData({ //如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数 　　　　
        vipid: inform.vipid,
        username: inform.vipname,
        userImg_url: inform.userImg_url,
        price: inform.price,
      })
    })
  },
  /**
   * 获取页面数据（普通用户信息）
   */
  getPersonalInfo:function() {
    // var that = this;
    // let nickName = this.data.userInfo.nickName
    // let src = this.data.userInfo.avatarUrl
    // //success
    // that.setData({
    //   username: nickName,
    //   userImg_url: src
    // })
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/getdetail?token=' + wx.getStorageSync('token'),
    }).then((res) => {
      console.log(res);
      let lists = res.data.lists
      let inform = {}
      inform.userid = lists.id//普通用户ID
      inform.username = lists.nickname//昵称
      inform.userImg_url = lists.avatar//头像
      inform.price = Number(lists.can_rebate) + Number(lists.no_rebate) + Number(lists.user_money)//账户余额
      inform.usermoney = Number(lists.can_rebate) + Number(lists.user_money)//可提现全部余额
      inform.can_rebate = Number(lists.can_rebate)//可提现返利
      inform.mobile = lists.mobile//电话号码
      inform.address = lists.address//地址
      inform.inviter_id = lists.inviter_id//邀请id
      inform.sex = lists.sex//性别
      inform.card_one = lists.card_one//身份证正面
      inform.card_two = lists.card_two//身份证反面
      inform.license = lists.license//营业执照
      wx.setStorageSync('inform', inform)

      that.setData({ //如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数 　　　　
        vipid: inform.userid,
        username: inform.username,
        userImg_url: inform.userImg_url,
        price: inform.price,
      })
    })
  },
  //个人资料
  userinfo:function(){
    wx.navigateTo({
      url: '../personal_data/personal_data',
    })
  },
  //设置
  setbtn:function(){
    wx.navigateTo({
      url: '../set/set'
    })
  },
  //充值
  recharge:function(){
    if (Number(this.data.vipid) == 0) {
      wx.showModal({
        title: '警告通知',
        content: '你还不是会员，无法充值，请进入会员申请页面选择会员等级充值会员',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../applyVIP/applyVIP',
            })
          } else if (res.cancel){
            wx.navigateTo({
              url: '../mine/mine',
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../recharge/recharge',
      })
    }  
  },
  //提现
  withdraw: function () {
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  },
  //查看零钱明细
  lookdetail:function(){
    wx.navigateTo({
      url: '../moneyDetail/moneyDetail',
    })
  },
  //查看更多订单
  moreOrder:function(){
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=0',
    })
  },
  waitPay: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=1',
    })
  },
  waitSent: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=2',
    })
  },
  waitReceived: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=3',
    })
  },
  completed: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder?currtab=4',
    })
  },
  //地址管理
  address:function(){
    wx.navigateTo({
      url: '../myAddress/myAddress',
    })
  },
  //会员申请
  applyVIP:function(){
    wx.navigateTo({
      url: '../VIPcenter/VIPcenter',
    })
  },
  //优惠卷
  coupon:function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
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