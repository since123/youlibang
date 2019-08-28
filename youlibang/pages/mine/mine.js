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
    userImg_url:'',
    price:'0.00',
    encryptedData: wx.getStorageSync('encryptedData'),
    status: true,
    ifUser: true,
    ifPhone: true,
    lineUrl: 'https://wx.ylbtl.cn'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getifAuthorize()
    let that = this
    if (wx.getStorageSync('token')) {
      //判断是否是会员
      that.isMember()
      console.log(wx.getStorageSync('vipid'))
      if (wx.getStorageSync('userInfo') == '' || wx.getStorageSync('encryptedData') == '') {
        this.setData({
          status : false,
          ifUser : false
        })
      } else {
        this.setData({
          status: true,
          ifUser: true,
          ifPhone: true,
        })
        //判断vipid并缓存
        console.log('都授权成功')
        //获取权限成功后存储用户信息。
        this.saveUserInform()
        if (Number(wx.getStorageSync('vipid')) != 0) {
          that.getVipUserInfo()
        } else if (Number(wx.getStorageSync('vipid')) == 0) {
          that.getPersonalInfo()
        }
      }
    } else {
      console.log('token获取失败')
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
      
      let urlStr = lists.avatar.replace(/\\/g, '/')
      inform.userImg_url = that.data.lineUrl + urlStr
      inform.price = Number(lists.can_rebate) + Number(lists.no_rebate) + Number(lists.user_money)//账户余额
      inform.usermoney = Number(lists.can_rebate) + Number(lists.user_money)//可提现全部余额
      inform.can_rebate = Number(lists.can_rebate)//可提现返利
      inform.mobile = lists.phone//电话号码
      //inform.address = lists.address//地址
      inform.inviter_id = lists.inviter_id//邀请id
      inform.sex = lists.sex//性别
      inform.card_one = that.data.lineUrl + lists.card_one.replace(/\\/g, '/')//身份证正面
      inform.card_two = that.data.lineUrl + lists.card_two.replace(/\\/g, '/')//身份证反面
      inform.license = that.data.lineUrl + lists.license.replace(/\\/g, '/')//营业执照
      wx.setStorageSync('inform', inform)
      console.log(wx.getStorageSync('inform'))
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
        vipid: 0,
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
  // /**
  //  *检查是否授权
  //  */
  getifAuthorize: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // console.log(res.authSetting['scope.userInfo'])
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function (res) { }
          })
        } else {
        }
      },
      fail: function (res) { }
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

  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    //点击获取userInfo并缓存
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.setData({
      ifPhone: false,
      ifUser: true
    })
  },
  getPhoneNumber: function (e) {
    let that = this
    wx.setStorageSync('encryptedData', e.detail.encryptedData)
    that.onLoad()
  },
  /**
   * 将用户信息存入数据库
   */
  saveUserInform: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    let nickname = userInfo.nickName
    let gender = userInfo.gender
    let language = userInfo.language
    let city = userInfo.city
    let country = userInfo.country
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'index/usersave?mobile=' + wx.getStorageSync('encryptedData') + '&nikcname='  + nickname + '&gender=' + gender + '&language=' + language + '&city=' + city + '&country=' + country  + '&token=' + wx.getStorageSync('token'),
    }).then((res) => {
      console.log(res)
    })
  },
  /**
       * 是否是注册的会员
      */
  isMember() {
    let that = this
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/ismember?token=' + wx.getStorageSync('token') + '&user_id=' + wx.getStorageSync('userid'),
    }).then((res) => {
      let vipid = res.data.lists
      if (vipid) {
        wx.setStorageSync('vipid', vipid)
        console.log('您是会员')
      } else {
        wx.setStorageSync('vipid', 0)
        console.log('您不是会员')
      }
    })
  },
})