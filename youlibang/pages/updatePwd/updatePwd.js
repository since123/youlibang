// pages/updatePwd/updatePwd.js
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
    // 验证码是否正确
    codeValue: '',//验证码输入值
    ifTrueCode: true,//验证码输入是否为真的标志
    getNewCode: '',//获取到的验证码
    ajxtrue: false, 
    getText2: '获取验证码',//验证码上字段显示
    //密码格式
    passwordValue: '',
    // ifTruePassword: false
    formValue: '',
    oldpassword: '',
    newpassword: '',
    createStatus: true,
    editStatus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let formValue = (options && options.formValue) || 1
    this.setData({
      formValue: formValue
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // /**
  //  * 输入密码(设置密码时)
  //  */
  entryPassword: function (e) {
    let that = this
    let passwordValue = e.detail.value
    that.setData({
      passwordValue: passwordValue
    })
  },
  //设置密码formSubmitone
  formSubmitone: function () {
    let that = this
    if (!(/^[a-zA-Z0-9]{6,20}/).test(that.data.passwordValue)) {
        wx.showModal({
          content: '输入密码有误',
          showCancel: false,
        })
    } else {
      httpReq({
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        url: ApiUrl.phplist + 'member/createPsw?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid') + '&psw=' + that.data.passwordValue,
      }).then((res) => {
        console.log(res)
        let passwordStatus = res.data.lists
        if (Number(passwordStatus)) {
          that.setData({
            passwordValue: '',
            createStatus: false
          })
        }
      })
    }
  },
  //成功设置密码之后弹窗
  createconfirm: function() {
    this.setData({
      createStatus: true
    })
  },
  // //输入验证码
  // entryCode:function(e){
  //   let that = this;
  //   let codeValue = e.detail.value;//获取输入的验证码
  //   let getNewCode = this.data.getNewCode;
  //   that.setData({
  //     codeValue: codeValue,
  //     ifTrueCode: false,
  //   })
  //   if (codeValue.length >= 4) {
  //     if (codeValue == getNewCode) {
  //       that.setData({
  //         ifTrueCode: true,
  //       })
  //     } else {
  //       that.setData({
  //         ifTrueCode: false,
  //       })
  //       wx.showModal({
  //         content: '输入验证码有误',
  //         showCancel: false,
  //         success: function (res) { }
  //       })
  //     }
  //   }
  // },
  /**
   * 获取验证码
   */
  // sendCodeBtn: function () {
  //   let ifCodeagain = this.data.ifCodeagain;
  //   console.log(ifCodeagain)
  //   let n = 59;
  //   let that = this;
  //   if (ifCodeagain) {
  //     this.setData({
  //       ifCodeagain: false
  //     })
  //     let lovetime = setInterval(function () {
  //       let str = '(' + n + ')' + '重新获取'
  //       that.setData({
  //         getText2: str
  //       })
  //       if (n <= 0) {
  //         that.setData({
  //           ifCodeagain: true,
  //           getText2: '重新获取'
  //         })
  //         clearInterval(lovetime);
  //       }
  //       n--;
  //     }, 1000);

  //     //获取验证码接口写在这里
  //     //例子 并非真实接口
  //     app.agriknow.sendMsg(phone).then(res => {
  //       console.log('请求获取验证码.res =>', res)
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   }
  // },
  
  
  /**
   * 修改密码提交表单
   */
  // formSubmittwo: function() {
  //   let val = e.detail.value
  //   console.log('val', val)
  //   var phone = val.code //电话
  //   var phoneCode = val.password //验证码
  //   if (!ifTrueCode){
  //     wx.showModal({
  //       content: '输入验证码有误',
  //       showCancel: false,
  //     })
  //   }
  //   else {
  //     if (!(/^[a-zA-Z0-9]{6,20}/).test(this.data.passwordValue)) {
  //       wx.showModal({
  //         content: '输入密码有误',
  //         showCancel: false,
  //       })
  //     } else {
  //       //进行提交
  //       httpReq({
  //         header: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //         },
  //         url: ApiUrl.phplist + 'member/editpsw?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid') + '&psw=' + that.data.passwordValue,
  //       }).then((res) => {
  //         console.log(res)
  //       })
  //     }
  //   }
  // },
  //输入旧密码
  entryoldPassword: function(e) {
    let oldpassword = e.detail.value
    this.setData({
      oldpassword: oldpassword
    })
    console.log(this.data.oldpassword)
  },
  //输入新密码
  entrynewPassword: function(e) {
    let newpassword = e.detail.value
    this.setData({
      newpassword: newpassword
    })
    console.log(this.data.newpassword)
  },
  //修改密码formSubmittwo
  formSubmittwo: function () {
    let that = this
    if (!(/^[a-zA-Z0-9]{6,20}/).test(that.data.newpassword)) {
      wx.showModal({
        content: '输入密码有误',
        showCancel: false,
      })
    } else {
      httpReq({
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        url: ApiUrl.phplist + 'member/editpsw?token=' + wx.getStorageSync('token') + '&member_id=' + wx.getStorageSync('vipid') + '&psw_old=' + that.data.oldpassword + '&psw_new=' + that.data.newpassword,
      }).then((res) => {
        console.log(res)
        let passwordStatus = res.data.lists
        if (Number(passwordStatus)) {
          that.setData({
            passwordValue: '',
            editStatus: false
          })
        }
      })
    }
  },
  //成功修改密码之后弹窗
  editconfirm: function() {
    this.setData({
      editStatus: true,
    })
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