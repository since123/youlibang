// pages/myAddress/myAddress.js
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
    httpReq({
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: 'http://www.ylb.com/api/user/getaddress',
    }).then((res) => {
      var addressList = res.data.lists
      //console.log(addressList)
      console.log(res)
      if (addressList == undefined) {
        this.setData({
          user_id: 5
        })
      } else {
        var user_id = addressList[0].user_id
      //  循环追加区分标识
      for(let i=0;i<addressList.length;i++){
          addressList[i].state=false
          if(addressList[i].state!=false){
            addressList[i].state=true
          }else{
            addressList[0].state = true
          }
      }

       
        console.log(addressList)
        this.setData({
          addressList,
          user_id
        })
        //存入缓存
        wx.setStorageSync('addressList', addressList)
      }

    });
    
  },
  choose(e){
   var addressList=this.data.addressList
    var id = e.currentTarget.dataset.id
    console.log(id)
    for(let i=0;i<addressList.length;i++){
      addressList[i].state=false
          if(addressList[i].id==id){
               addressList[i].state=true
          }
    }
    console.log(addressList)
    this.setData({
      addressList
    })
  },
  //事件处理
  //设为默认
  setDefault(e){
    console.log(e)
    var id=e.target.dataset.id
   // console.log(id)
    var addressList=this.data.addressList
    var address = []
    for(let i=0;i<addressList.length;i++){
        if(addressList[i].id==id){
            // console.log(addressList[i])
          address.push(addressList[i])
        }
    }
    //console.log(address)
    //更改数据库里面的
    address[0].address_type=1
    var address_type = address[0].address_type
    var address_id = address[0].id
    console.log(address_id,address_type)
    //将数据提交出去


    //如果成功了
    wx.showToast({
      title: '修改成功！',
    })
   
  },
  //新增地址
  addAddress:function(e){
    var user_id=this.data.user_id
    wx.navigateTo({
      url: '../address/address?user_id='+user_id,
    })
  },
  //编辑收货地址
  editAddress: function (e) {
    console.log(e)
    var id=e.target.dataset.id
    var user_id = e.target.dataset.user_id
    wx.navigateTo({
      url: '../editAddress/editAddress?id='+id+'&user_id='+user_id,
    })
  },
  //删除地址
  deleteAddress: function (e) {
    console.log(e)
   var user_id=this.data.user_id
    var address_id = e.target.dataset.id
    var index = e.target.dataset.index
    console.log(user_id,address_id,index)
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
            url: 'http://www.ylb.com/api/user/deladdress?user_id='+user_id+'&address_id='+address_id,
          }).then((res) => {
            //返回成功或失败的标识
          console.log(res)
          //从缓存中取出
          
          console.log(that)
          wx.getStorage({
            key: 'addressList',
            success: ((res)=>{
                console.log(res)
                var addressList=res.data
               //执行删除
               addressList.splice(index,1)
               //console.log(addressList)
             // console.log(that)
             that.setData({
                 addressList
             })
          }),
          })

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