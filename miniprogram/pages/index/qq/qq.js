// pages/index/qq/qq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qq:""
  },
   onInput: function(e) {
    this.setData({
      qq:e.detail.value
    })
    // console.log(this.data.qq)
  },
  qq:function(){
    wx.cloud.callFunction({
      name:"qq",
      data:{
        qq: this.data.qq,
        key: "07b9fe3f54385fff8ec93cd04b9ad71e"
      },
      success: res => {
        console.log(res.result.result.data)
        this.setData({result:res.result.result.data})
      }
    })

    // wx.request({
    //   url: "http://japi.juhe.cn/qqevaluate/qq",
    //   data: {
    //     qq: this.data.qq,
    //     key: "07b9fe3f54385fff8ec93cd04b9ad71e"
    //   },
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success: res => {
    //     // console.log(res.data.result)
    //     this.setData({result:res.data.result.data})
    //   }
    // });
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