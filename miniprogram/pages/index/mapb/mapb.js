// pages/index/maps/maps.js
const chooseLocation = requirePlugin('chooseLocation');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    hideLoading: false,
  },

  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: this.data.locationNow.address,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  routeMap: function(e) {
    console.log(e);
    let that = this
    wx.getLocation({
      type: "gcj02", //返回可以用于wx.openLocation的经纬度
      success(res) {
        // const latitude = res.latitude;
        // const longitude = res.longitude;
        const latitude = that.data.location.latitude;
        const longitude = that.data.location.longitude;
        const name = "经度"+latitude
        const address = "纬度"+longitude
        wx.openLocation({
          latitude,
          longitude,
          name,
          address,
          scale: 18
        });
      }
    });
  },

  map2:function(){
    let plugin = requirePlugin("subway");
    let key = 'LFCBZ-WDJLW-2D2R2-OTZTL-2DZBS-ZJBLP';//使用在腾讯位置服务申请的key;
    let referer = 'todo'; //调用插件的app的名称
    wx.navigateTo({
     url: 'plugin://subway/index?key=' + key + '&referer=' + referer
    });
  },

  map:function(){
    let plugin = requirePlugin("routePlan");
    let key = "LFCBZ-WDJLW-2D2R2-OTZTL-2DZBS-ZJBLP"; //使用在腾讯位置服务申请的key
    let referer = "todo"; //调用插件的app的名称
    let endPoint = JSON.stringify({
      //终点
      name: "河南理工大学计算机学院",
      latitude: 35.1873920000,
      longitude: 113.2731010000
    });
    wx.navigateTo({
      url:
        "plugin://routePlan/index?key=" +
        key +
        "&referer=" +
        referer +
        "&endPoint=" +
        endPoint
    });
  },
  mapp1:function(){
    wx.navigateTo({
      url:'../mapw/mapw',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      success:function(){}        //成功后的回调；     //结束后的回调(成功，失败都会执行)
    })
  },
  map3:function(){
    const key = 'LFCBZ-WDJLW-2D2R2-OTZTL-2DZBS-ZJBLP'; //使用在腾讯位置服务申请的key
    const referer = 'todo'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: this.data.location.latitude,
      longitude: this.data.location.longitude
    });
    const category = '生活服务,娱乐休闲';
     
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
              hideLoading: false,
          });
      }, 300);
  }, 3000);
    wx.getLocation({
      success: res => {
        console.log(res);
        this.setData({
          location: res,
          markers: [
            {
              id: 1,
              latitude: res.latitude,
              longitude: res.longitude,
              title: "目前位置"
            }
          ]
        });
        // console.log(app.globalData.location);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log(location)
    this.setData({
      locationNow:location
    })
    wx.getSetting({
      success: res => {
        console.log(JSON.stringify(res));
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (
          res.authSetting["scope.userLocation"] != undefined &&
          res.authSetting["scope.userLocation"] != true
        ) {
          wx.showModal({
            title: "请求授权当前位置",
            content: "需要获取您的地理位置，请确认授权",
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: "拒绝授权",
                  icon: "none",
                  duration: 1000
                });
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: "授权成功",
                        icon: "success",
                        duration: 1000
                      });
                      //再次授权，调用wx.getLocation的API
                    } else {
                      wx.showToast({
                        title: "授权失败",
                        icon: "none",
                        duration: 1000
                      });
                    }
                  }
                });
              }
            }
          });
        } else if (res.authSetting["scope.userLocation"] == undefined) {
          //调用wx.getLocation的API
        } else {
          //调用wx.getLocation的API
        }
      }
    });
  },

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
