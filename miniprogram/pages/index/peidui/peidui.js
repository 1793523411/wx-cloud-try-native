// pages/index/peidui/peidui.js
Page({
  /**
   * 页面的初始数据
   */

  data: {
    array2: ["请选择", "白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "摩羯", "水瓶", "双鱼"],
    array3: ["请选择", "白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "摩羯", "水瓶", "双鱼"],
    value2: 0,
    value3: 0,
    result:{}
  },
  bindPicker2Change: function(e) {
    console.log(e)

    this.setData({
      value2: e.detail.value
    });
    // console.log(this.data.array2[this.data.value2])
  },
  bindPicker3Change: function(e) {
    console.log(e)
    this.setData({
      value3: e.detail.value
    });
    // console.log(this.data.array3[this.data.value3])
  },

  // onInput: function(e) {
  //   this.setData({
  //     man:e.detail.value
  //   })
  //   console.log(this.data.man)
  // },
  // onClear() {
  //   this.setData({
  //     value: "",
  //     showClearBtn: false,
  //     isWaring: false
  //   });
  // },
  // onConfirm() {
  //   if (this.data.value.length < 16) {
  //     this.setData({
  //       isWaring: true
  //     });
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(this.data.result)
  },

  peidui:function(){
    wx.cloud.callFunction({
      name:"peidui",
      data:{
        men: this.data.array2[this.data.value2],
        women: this.data.array3[this.data.value3],
        key: "b4616f4a7815e8cf16cae0584a5d0756"
      },
      success: res => {
        console.log(res.result)
        this.setData({result:res.result.result})
      }
    })
    // wx.request({
    //   url: "http://apis.juhe.cn/xzpd/query",
    //   data: {
    //     men: this.data.array2[this.data.value2],
    //     women: this.data.array3[this.data.value3],
    //     key: "b4616f4a7815e8cf16cae0584a5d0756"
    //   },
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success: res => {
    //     // console.log(res.data.result)
    //     this.setData({result:res.data.result})
    //   }
    // });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
