// pages/index/yun/yun.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array2: [
      "请选择",
      "白羊座",
      "金牛座",
      "双子座",
      "巨蟹座",
      "狮子座",
      "处女座",
      "天秤座",
      "天蝎座",
      "射手座",
      "摩羯座",
      "水瓶座",
      "双鱼座"
    ],
    array3: ["请选择", "today", "tomorrow", "week", "month", "year"],
    value2: 0,
    value3: 0,
    result: {},
    module: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.yun();
  },
  bindPicker2Change: function(e) {
    console.log(e);

    this.setData({
      value2: e.detail.value
    });
    // console.log(this.data.array2[this.data.value2])
  },
  bindPicker3Change: function(e) {
    console.log(e);
    this.setData({
      value3: e.detail.value
    });
    // console.log(this.data.array3[this.data.value3])
  },
  yun: function() {
    wx.cloud.callFunction({
      name: "yun",
      data: {
        consName: this.data.array2[this.data.value2],
        type: this.data.array3[this.data.value3],
        key: "1451074380a18ba3f61ba70019558286"
      },
      success: res => {
        console.log(res.result);
        this.setData({ result: res.result });
        // this.setData({ result: res.data });
        this.setData({ module: this.data.array3[this.data.value3] });
      }
    });
    // wx.request({
    //   url: "http://web.juhe.cn:8080/constellation/getAll",
    //   data: {
    //     consName:this.data.array2[this.data.value2],
    //     type:this.data.array3[this.data.value3],
    //     key: "1451074380a18ba3f61ba70019558286"
    //   },
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success: res => {
    //     console.log(res.data);
    //     this.setData({ result: res.data});
    //     this.setData({module:this.data.array3[this.data.value3]})

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
