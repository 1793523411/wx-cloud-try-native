const app = getApp();
var WxParse = require("../wxParse/wxParse");
var inputVal = "";
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

function initData(that) {
  inputVal = "";

  msgList = [
    {
      speaker: "server",
      contentType: "text",
      content: "在这里你可跟我聊聊天~~"
    },
    {
      speaker: "customer",
      contentType: "text",
      content: "hello 小程序"
    }
  ];
  that.setData({
    msgList,
    inputVal
  });
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    locations: {},
    week: "",
    load: true,
    load2: true,
    loading: false,
    hideLoading: false,
    bgc: "",
    scrollHeight: "100vh",
    inputBottom: 0
  },

  refresh: function() {
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
    wx.getLocation({
      success: res => {
        let that = this;
        console.log(res);
        this.setData({
          locations: res,
          location: `"${res.latitude},${res.longitude}"`
        });
        var latitude = res.latitude.toString();
        var longitude = res.longitude.toString();
        var loc = latitude + "," + longitude;
        // console.log( typeof latitude)
        // console.log(String(res.latitude))
        // console.log(this.data.location)
        // wx.cloud.callFunction({
        //   name:"xiao",
        //   data:{
        //     key: "d91034639a13d2dc557f2a229a65d66b"
        //   },
        //   success: res => {
        //     console.log(res.result)
        //     this.setData({result:res.result.result})
        //   }
        // })
        wx.cloud.callFunction({
          name: "now",
          data: {
            location: loc,
            key: app.globalData.heweatherKey
          },
          success(res) {
            console.log("普通----------", res.result);
            that.setData({
              common: res.result.HeWeather6[0]
            });
            console.log(parseInt(res.result.HeWeather6[0].now.cond_code));
            switch (parseInt(res.result.HeWeather6[0].now.cond_code)) {
              case 101:
                that.setData({ bgc: "background-duoyun" });
                break;
              case 102:
                that.setData({ bgc: "background-duoyun" });
                break;
              case 305:
                that.setData({ bgc: "background-xiaoyu" });
                break;
              case 306:
                that.setData({ bgc: "background-zhongyu" });
                break;
              case 302:
                that.setData({ bgc: "background-leizhenyu" });
                break;
              case 303:
                that.setData({ bgc: "background-yu" });
                break;
              case 309:
                that.setData({ bgc: "background-yu" });
                break;
              case 301:
                that.setData({ bgc: "background-yu" });
                break;
              case 307:
                that.setData({ bgc: "background-dayu" });
                break;
              case 400:
                that.setData({ bgc: "background-xue" });
                break;
              case 401:
                that.setData({ bgc: "background-xue" });
                break;
              case 402:
                that.setData({ bgc: "background-xue" });
                break;
              case 403:
                that.setData({ bgc: "background-xue" });
                break;
              case 404:
                that.setData({ bgc: "background-xue" });
                break;
              case 405:
                that.setData({ bgc: "background-xue" });
                break;
              case 100:
                that.setData({ bgc: "background-qing" });
                break;
              case 103:
                that.setData({ bgc: "background-qing2" });
                break;
              case 200:
                that.setData({ bgc: "background-qing3" });
                break;
              default:
                that.setData({ bgc: "background-default" });
                break;
            }
            console.log("普通", res.result.HeWeather6[0]);
          }
        });
        wx.cloud.callFunction({
          name: "will",
          data: {
            location: loc,
            key: app.globalData.heweatherKey
          },
          success(res) {
            console.log("生活----------", res.data);
            that.setData({
              life: res.result.HeWeather6[0].lifestyle
            });
            console.log("生活", res.result.HeWeather6[0].lifestyle);
          }
        });
        wx.cloud.callFunction({
          name: "life",
          data: {
            location: loc,
            key: app.globalData.heweatherKey
          },
          success(res) {
            console.log("未来", res.result);
            that.setData({
              will: res.result.HeWeather6[0].daily_forecast
            });
            console.log("未来", res.result.HeWeather6[0].daily_forecast);
          }
        });
        // console.log(app.globalData.location);
      }
    });
  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: windowHeight - keyHeight + "px"
    });
    this.setData({
      toView: "msg-" + (msgList.length - 1),
      inputBottom: keyHeight + "px"
    });
    //计算msg高度
    // calScrollHeight(this, keyHeight);
  },
  blur: function(e) {
    this.setData({
      scrollHeight: "100vh",
      inputBottom: 0
    });
    this.setData({
      toView: "msg-" + (msgList.length - 1)
    });
  },
  sendClick: function(e) {
    console.log(e);
    msgList.push({
      speaker: "customer",
      contentType: "text",
      content: e.detail.value
    });
    inputVal = "";
    this.setData({
      msgList,
      inputVal
    });
    wx.cloud.callFunction({
      name: "liao",
      data: {
        val: e.detail.value,
        key: "d91034639a13d2dc557f2a229a65d66b"
      },
      success: res => {
        console.log(res.data);
        msgList.push({
          speaker: "server",
          contentType: "text",
          content: res.result.result.content
        });
        // this.setData({ result: res.data});
        // this.setData({module:this.data.array3[this.data.value3]})
        // inputVal = "";
        this.setData({
          msgList
          // inputVal
        });
      }
    });
    // wx.request({
    //   url: `https://api.jisuapi.com/iqa/query?appkey=8d7d92e7e0c118d2&question=${e.detail.value}`,
    //   data: {

    //   },
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success: res => {
    //     console.log(res.data);
    //     msgList.push({
    //       speaker: "server",
    //       contentType: "text",
    //       content: res.data.result.content
    //     });
    //     // this.setData({ result: res.data});
    //     // this.setData({module:this.data.array3[this.data.value3]})
    //     // inputVal = "";
    //     this.setData({
    //       msgList,
    //       // inputVal
    //     });
    //   }
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl
    });
    // var article = '<p>亲爱的<strong>大肆大肆多</strong><em>大肆大肆多群</em><u>奥术大师大所大所</u><del>奥术大师大所</del></p><ol><li>大肆大肆大</li></ol><ul><li>dasdasda</li><li>大的撒多撒</li></ul><hr><ul><li><br></li></ul>';
    // WxParse.wxParse('article', 'html', article, this,0);
    // this.checkUser();
    var dates = new Date();
    this.setData({ date: dates.getHours() });
    // console.log(this.data.date)
    var str = "";
    var week = new Date().getDay();
    if (week == 0) {
      this.setData({ week: "星期日" });
    } else if (week == 1) {
      this.setData({ week: "星期一" });
    } else if (week == 2) {
      this.setData({ week: "星期二" });
    } else if (week == 3) {
      this.setData({ week: "星期三" });
    } else if (week == 4) {
      this.setData({ week: "星期四" });
    } else if (week == 5) {
      this.setData({ week: "星期五" });
    } else if (week == 6) {
      this.setData({ week: "星期六" });
    }
    //  let location = `{this.data.latitude},{this.data.longitude}`
    //  console.log(location)
    wx.getLocation({
      success: res => {
        let that = this;
        console.log(res);
        this.setData({
          locations: res,
          location: `"${res.latitude},${res.longitude}"`
        });
        var latitude = res.latitude.toString();
        var longitude = res.longitude.toString();
        var loc = latitude + "," + longitude;
        // console.log( typeof latitude)
        // console.log(String(res.latitude))
        // console.log(this.data.location)
        wx.cloud.callFunction({
          name: "now",
          data: {
            location: loc,
            key: app.globalData.heweatherKey
          },
          success(res) {
            console.log("普通----------", res.result);
            that.setData({
              common: res.result.HeWeather6[0]
            });
            console.log(parseInt(res.result.HeWeather6[0].now.cond_code));
            switch (parseInt(res.result.HeWeather6[0].now.cond_code)) {
              case 101:
                that.setData({ bgc: "background-duoyun" });
                break;
              case 102:
                that.setData({ bgc: "background-duoyun" });
                break;
              case 305:
                that.setData({ bgc: "background-xiaoyu" });
                break;
              case 306:
                that.setData({ bgc: "background-zhongyu" });
                break;
              case 302:
                that.setData({ bgc: "background-leizhenyu" });
                break;
              case 303:
                that.setData({ bgc: "background-yu" });
                break;
              case 309:
                that.setData({ bgc: "background-yu" });
                break;
              case 301:
                that.setData({ bgc: "background-yu" });
                break;
              case 307:
                that.setData({ bgc: "background-dayu" });
                break;
              case 400:
                that.setData({ bgc: "background-xue" });
                break;
              case 401:
                that.setData({ bgc: "background-xue" });
                break;
              case 402:
                that.setData({ bgc: "background-xue" });
                break;
              case 403:
                that.setData({ bgc: "background-xue" });
                break;
              case 404:
                that.setData({ bgc: "background-xue" });
                break;
              case 405:
                that.setData({ bgc: "background-xue" });
                break;
              case 100:
                that.setData({ bgc: "background-qing" });
                break;
              case 103:
                that.setData({ bgc: "background-qing2" });
                break;
              case 200:
                that.setData({ bgc: "background-qing3" });
                break;
              default:
                that.setData({ bgc: "background-default" });
                break;
            }
            console.log("普通", res.result.HeWeather6[0]);
          }
        });
        wx.cloud.callFunction({
          name: "will",
          data: {
            location: loc,
            key: app.globalData.heweatherKey
          },
          success(res) {
            console.log("生活----------", res.data);
            that.setData({
              life: res.result.HeWeather6[0].lifestyle
            });
            console.log("生活", res.result.HeWeather6[0].lifestyle);
          }
        });
        wx.cloud.callFunction({
          name: "life",
          data: {
            location: loc,
            key: app.globalData.heweatherKey
          },
          success(res) {
            console.log("未来", res.result);
            that.setData({
              will: res.result.HeWeather6[0].daily_forecast
            });
            console.log("未来", res.result.HeWeather6[0].daily_forecast);
          }
        });
        // console.log(app.globalData.location);
      }
    });
  },

  imageError: function(e) {
    console.log("image发生error事件，携带值为", e.detail.errMsg);
    this.setData({
      load: "false"
    });
  },
  imageError2: function(e) {
    console.log("image2发生error事件，携带值为", e.detail.errMsg);
    this.setData({
      load2: "false"
    });
  },
  // 检查是否有用户
  async checkUser() {
    // console.log(app.globalData)
    this.setData({
      userinfo: app.globalData.userinfo
    });
    if (!app.globalData.hasUser) {
      app.globalData.hasUser = false;
      return wx.switchTab({ url: "/pages/user/user" });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.getLocation({
      success: res => {
        console.log(res);
        this.setData({
          location: res
        });
        // console.log(app.globalData.location);
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
