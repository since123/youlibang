// pages/myAddress/myAddress.js
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
    addressList: [
    
    ],
    address: '',
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var member_id = wx.getStorageSync('vipid')
    console.log(member_id)
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: ApiUrl.phplist + 'user/getaddress?member_id=' + member_id,
    }).then((res) => {
      console.log(res)
      var addressList = res.data.lists
      //console.log(addressList)
      //console.log(res)

      if (addressList == undefined) {
        this.setData({
          member_id
        })
      } else {
        var member_id = wx.getStorageSync('vipid')
        //  循环追加区分标识
        if(wx.getStorageSync('index')!=undefined){
             for(let i=0;i<addressList.length;i++){
                     addressList[i].state=false
                     if(addressList[i].id==wx.getStorageSync('index')){
                       addressList[i].state=true
                     }
             }
        }else{
           
          for (let i = 0; i < addressList.length; i++) {
            addressList[i].state = false
            if (addressList[i].state != false) {
              addressList[i].state = true
            } 
          }

        }
        


        console.log(addressList)
        this.setData({
          addressList,
          member_id
        })
        //存入缓存
        wx.setStorageSync('addressList', addressList)
      }


    });
    // var arr = wx.getStorageSync('addressList') || [];
    // console.info("缓存数据：" + arr);
    // // 更新数据  
    // this.setData({
    //   addressList: arr
    // });
    // var address=this.data.addressList[0]
    //获取本地存储
    // try{
    //   var addressList=wx.getStorageSync('address')
    //   if(addressList){
    //      addressList[0].selected=true
    //      console.log(addressList)
    //      this.setData({
    //        addressList
    //      })
    //      console.log(this.data.addressList)
    //   }
    // }catch(e){

    // }
    // 请求地址展示接口
    
    
  },
  // choose(e){
  //  var addressList=this.data.addressList
  //   var id = e.currentTarget.dataset.id
  //   console.log(id)
  //   for (let i = 0; i < addressList.length; i++) {
  //     addressList[i].state = false
  //     if (addressList[i].id == id) {
  //       addressList[i].state = true
  //     }
  //   }
  //   console.log(addressList)
  //   this.setData({
  //     addressList
  //   })
  // },
  //事件处理
  //设为默认
  setDefault(e){
    console.log(e)
    var id=e.target.dataset.id
    var member_id=wx.getStorageSync('vipid')
   console.log(member_id)
    var addressList=this.data.addressList
    var address = []
    for(let i=0;i<addressList.length;i++){
      addressList[i].state = false
        if(addressList[i].id==id){
            // console.log(addressList[i])
          addressList[i].state = true
          address.push(addressList[i])
        }
    }
    this.setData({
      addressList
    })
  
    //存入本地存储
    wx.setStorageSync('index', id)
    //console.log(address)
    //更改数据库里面的
    address[0].address_type=1
    var address_type = address[0].address_type
    var address_id = address[0].id
    console.log(address_id,address_type,member_id)
    //将数据提交出去
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url:ApiUrl.phplist+'user/defselect?member_id='+member_id+'&address_id='+address_id+'&address_type='+address_type,
    }).then((res) => {
      console.log(res)
      if(res.data.code==10000){
        //如果成功了
        wx.showToast({
          title: '修改成功！',
        })
      }else{
        wx.showToast({
          title: '修改失败！！',
        })
      }
    
    });
    
  
   
  },
  //新增地址
  addAddress:function(e){
    var member_id = wx.getStorageSync('vipid')
    wx.navigateTo({
      url: '../address/address?member_id='+member_id,
    })
  },
  //编辑收货地址
  editAddress: function (e) {
    console.log(e)
    var id=e.target.dataset.id
    var member_id = wx.getStorageSync('vipid')
    var address=this.data.addressList.filter((v)=>{
             if(id==v.id){
              return v
             }
    })
    console.log(address)
    address=JSON.stringify(address[0])
    wx.navigateTo({
      url: '../editAddress/editAddress?id='+id+'&member_id='+member_id+'&address='+address,
    })
  },
  //删除地址
  deleteAddress: function (e) {
    console.log(e)
    var member_id = wx.getStorageSync('vipid')
    var address_id = e.target.dataset.id
    var index = e.target.dataset.index
    console.log(member_id,address_id,index)
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
         //请求删除接口
          httpReq({
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            url: ApiUrl.phplist+'user/deladdress?member_id='+member_id+'&address_id='+address_id,
          }).then((res) => {
            //返回成功或失败的标识
          console.log(res)
          //从缓存中取出
          console.log(that)
          //同步取缓存
          try{
               var value=wx.getStorageSync('addressList')
               if(value){
                      value.splice(index,1)
                      console.log(value)
                      wx.setStorageSync('addressList', value)
                      that.setData({
                        addressList:value
                      })
               }else{
                 console.log('亲，没有地址了呢')
               }
          }catch(e){

          }

        });
        
        } else if (res.cancel) {
          return false;
          console.log('用户点击取消')
        }
      },
    
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