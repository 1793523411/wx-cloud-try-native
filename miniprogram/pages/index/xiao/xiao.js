// pages/index/xiao/xiao.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    hideLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.xiao();
  },
  xiao: function() {
    wx.cloud.callFunction({
      name:"xiao",
      data:{
        key: "d91034639a13d2dc557f2a229a65d66b"
      },
      success: res => {
        console.log(res.result)
        this.setData({result:res.result.result})
      }
    })
    // wx.request({
    //   url: "http://v.juhe.cn/joke/randJoke.php",
    //   data: {
    //     key: "d91034639a13d2dc557f2a229a65d66b"
    //   },
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success: res => {
    //     console.log(res.data.result);
    //     this.setData({ result: res.data.result });
        
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
  onReachBottom: function() {
    this.setData({
      loading: true
  });
  wx.cloud.callFunction({
    name:"xiao",
    data:{
      key: "d91034639a13d2dc557f2a229a65d66b"
    },
    success: res => {
      console.log(res.result)
      let new_data = res.result.result;
      let old_data = this.data.result;
      this.setData({ result:  old_data.concat(new_data)});
        this.setData({
          loading: false,
          hideLoading: false,
      });

    }
  })
    // wx.request({
    //   url: "http://v.juhe.cn/joke/randJoke.php",
    //   data: {
    //     key: "d91034639a13d2dc557f2a229a65d66b"
    //   },
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success: res => {
    //     console.log(this.data.result.length)
    //     let new_data = res.data.result;
    //     let old_data = this.data.result;
    //     console.log(res.data.result);
    //     this.setData({ result:  old_data.concat(new_data)});
    //     this.setData({
    //       loading: false,
    //       hideLoading: false,
    //   });
    //   }
    // });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
