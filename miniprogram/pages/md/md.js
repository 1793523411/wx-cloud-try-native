Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { result } = wx.cloud.callFunction({
      name: "tcb_extension_ci",
      data: {
        action:"ImageProcess", 
        cloudPath: "https://wx-xly-1301545895.cos.ap-beijing.myqcloud.com/wx-image/all-active.png?imageMogr2/thumbnail/!50p"
      }
  });
  console.log(result)
  // wx.hideLoading();
  
  // if (!result.code && result.data) {
  // this.setData(
  //     {
  //     faceRects: this.getFaceRects(result.data)
  //     },
  //     () => {
  //     this.triggerEvent("finish", result.data);
  //     }
  // );
  // } else {
  // throw result;
  // }
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