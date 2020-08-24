const app = getApp()
const db = wx.cloud.database()
const userInfo = db.collection('userinfo')

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    onLoad() {
        if (app.globalData.userInfo) {
          app.globalData.hasUser = true;
          app.globalData.hasUserInfo = true;
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })

            this.addUser(app.globalData.userInfo)
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })

                this.addUser(res.userInfo)
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo

                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })

                    this.addUser(app.globalData.userInfo)
                }
            })
        }
    },

    getUserInfo (e) {
        if (e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo
            // console.log(e.detail.userInfo)
            app.globalData.hasUser = true;
            app.globalData.hasUserInfo = true;
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })

            this.addUser(app.globalData.userInfo)

            // wx.switchTab({ url: '/pages/index/index' })
        }
    },

    // 如果数据库没有此用户，则添加
    async addUser (user) {
        // const db=wx.cloud.database()
        // let result=await db.collection('userinfo').add({
        //   data:{
        //     nickName:user.nickName,
        //   }
        // })
        // console.log(user)
        wx.cloud.callFunction({
          name:'getOpenId',
          complete: res => {
            // console.log(res.result.openId)
            app.globalData.id = res.result.openId
            userInfo.where({
              _openid:res.result.openId
            }).count().then(res => {
              // console.log(res)
              // console.log(res.total)
              if(res.total == 0){
                userInfo.add({
                  data:user
                }).then(res => {
                  // console.log(res)
                  app.globalData.nickName = user.nickName
                  app.globalData.id = res._id
                }).catch(err => {
                  console.log(err)
                })
              }else{
                // console.log(res)
              }
            })
           
          }
        })
        
       
    }
})
