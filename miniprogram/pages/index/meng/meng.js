// pages/index/meng/meng.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    meng: "",
    activeName: "1",
    loading: false,
    hideLoading: false
  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },

  onInput: function(e) {
    this.setData({
      meng: e.detail.value
    });
    // console.log(this.data.qq)
  },
  meng: function() {
    wx.cloud.callFunction({
      name: "meng",
      data: {
        q: this.data.meng,
        full: 1,
        key: "8173034d598b927c02c5a5330dbd8cd9"
      },
      success: res => {
        console.log(res.result);
        this.setData({ result: res.result.result });
        if (res.result.result == null) {
          this.setData({
            loading: true
          });
          setTimeout(() => {
            this.setData({
              hideLoading: true
            });
            setTimeout(() => {
              this.setData({
                loading: false,
                hideLoading: false
              });
            }, 100);
          }, 1000);
        }
      }
    });
    // wx.request({
    //   url: "http://v.juhe.cn/dream/query",
    //   data: {
    //     q: this.data.meng,
    //     full: 1,
    //     key: "8173034d598b927c02c5a5330dbd8cd9"
    //   },
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success: res => {
    //     // console.log(res.data.result)
    //     this.setData({ result: res.data.result });
    //     if (res.data.result == null) {
    //       this.setData({
    //         loading: true
    //       });
    //       setTimeout(() => {
    //         this.setData({
    //           hideLoading: true
    //         });
    //         setTimeout(() => {
    //           this.setData({
    //             loading: false,
    //             hideLoading: false
    //           });
    //         }, 100);
    //       }, 1000);
    //     }
    //   },
    //   fail: res => {}
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
