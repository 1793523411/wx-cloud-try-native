//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "xly-ba27v",
        traceUser: true
      });
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        } else {
          // 跳转登录页面让用户登录
          wx.switchTab({ url: "/pages/user/user" });
        }
      }
    });

    this.globalData = {
      hasUser: false, // 判断数据库中是否有用户
      hasUserInfo: false ,// 判断小程序的userInfo是否有获取
      userInfo: null,
      id: null,
      nickName: '',
      heweatherKey:"0c164f023ab9485388038b44918ed453", //和风天气key
    };
  },
});
