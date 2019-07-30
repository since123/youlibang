// pages/searchGoods/searchGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:"",
      state:true,
      status:false,
      searchGoods:[
       { title:"优力邦墙面医生",
          price:"500.00",
          img:"../../images/2012031220134655.jpg",
          id:1
        }, {
          title: "优力邦牛奶",
          price: "500.00",
          img: "../../images/2012031220134655.jpg",
          id:2
        },
        {
          title: "优力邦中药",
          price: "500.00",
          img: "../../images/2012031220134655.jpg",
          id:3
        }

      ]
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
  //获取输入内容
  search(e){
   
    var value=e.detail.value
   
     this.setData({
       value
     })
   // console.log(this.data.value)
  },
  //点击跳转搜索详情
  searchPath(){
    //如果没输入
    if(this.data.value==""){
      this.setData({
        state:false
      })
      return false
    }
    //获取搜索关键字
    var that=this
    var search=that.data.value
    console.log(search)
    var searchGoods=that.data.searchGoods
     console.log(searchGoods)
    let arr = searchGoods.map((v) => {
      v.title = v.title.replace(search,"<b style='color:red'>"+search+"</b>")
        return v
    })
    console.log(arr)
     this.setData({
       searchGoods:arr,
       status:true
     })
     that.onLoad()
     console.log(this.data.searchGoods)
  },
   //点击查找
   dianji(e){
   
     var inputvalue=e._relatedInfo.anchorTargetText
     this.setData({
       value:inputvalue,
       state:false,
       status:true
     })
     console.log(this.data.value)
    
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