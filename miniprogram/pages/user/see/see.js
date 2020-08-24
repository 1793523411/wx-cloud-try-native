// pages/user/see/see.js
const app = getApp()
const db = wx.cloud.database()
// const userInfo = db.collection('userinfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    loading: false,
    hideLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('userinfo').get().then(res => {
       this.setData({
        user:res.data
     })
     console.log(res.data)
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
    this.setData({
      loading: true
  });
  // setTimeout(() => {
      
  //     setTimeout(() => {
          // this.setData({
          //     loading: false,
          //     hideLoading: false,
          // });
  //     }, 300);
  // }, 3000);
    console.log("触底了")
    let page = this.data.page+20
    db.collection('userinfo').where({
      
    }).get().then(res => {
      let new_data = res.data
      let old_data = this.data.user
      console.log(res)
      this.setData({
        user: old_data.concat(new_data),
        page:page
      }, res2 => {
        this.setData({
          loading: false,
          hideLoading: false,
      });
        console.log(res2)
        console.log("数据更新完成")
        // wx.stopPullDownRefresh()
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})