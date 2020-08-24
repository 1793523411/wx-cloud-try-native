// pages/day/day.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formats: {},
    readOnly: false,
    bottom: 0,
    placeholder: "快来记录自己的点滴吧~~~~",
    userinfo: {},
    _focus: false,
    inputValue: ""
  },

  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
    console.log(e.detail.value);
  },

  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    });
  },
  toEditMain: function() {
    console.log("toEditMain添加至数据库")
    console.log(this.data.formData.content);
    let formData = this.data.formData.content;
    let inputValue = this.data.inputValue;
    var date = new Date();
    this.setData({ formData });
    console.log(inputValue);
    // let _openid = app.globalData.id
    db.collection("day")
      .add({
        data: {
          formData: formData,
          title: inputValue,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          remove: false,
          data:
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate()
        }
      })
      .then(res => {
        console.log(res);
        wx.navigateTo({
          url: '/pages/user/article/article',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      })
      .catch(console.error);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad页面加载")
    // console.log(app.globalData);
    // this.checkUser();
    this.setData({
      userinfo: app.globalData.userInfo,
      _openid: app.globalData.id
    });
  },
  // 检查是否有用户
  async checkUser() {
    // console.log(app.globalData)
    this.setData({
      userinfo: app.globalData.userinfo,
      _openid: app.globalData.id
    });

    if (!app.globalData.hasUser) {
      app.globalData.hasUser = false;
      return wx.switchTab({ url: "/pages/user/user" });
    }
  },

  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      console.log(res)
        that.editorCtx = res.context;
    }).exec();
},
  undo() {
    this.editorCtx.undo();
  },
  redo() {
    this.editorCtx.redo();
  },
  format(e) {
    let { name, value } = e.target.dataset;
    if (!name) return;
    // console.log('format', name, value)
    this.editorCtx.format(name, value);
  },
  onStatusChange(e) {
    console.log("onStatusChange------")
    console.log(e);
    const formats = e.detail;
    this.setData({ formats });
  },
  insertDivider() {
    console.log("insertDivider------")
    this.editorCtx.insertDivider({
      success: function() {
        console.log("insert divider success");
      }
    });
  },
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success");
      }
    });
  },
  removeFormat() {
    this.editorCtx.removeFormat();
  },
  insertDate() {
    const date = new Date();
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    this.editorCtx.insertText({
      text: formatDate
    });
  },
  // 点击图片将图片插入富文本编辑器里面
  insertImage() {
    var _this = this;
    wx.showLoading({
      title: "上传中..."
    });
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        //  console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        const filePath = tempFilePaths[0];
        // console.log(tempFilePaths)

        const cloudPath =
          `day/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` +
          filePath.match(/\.[^.]+?$/);
        // console.log(cloudPath)
        //执行上传文件操作
        wx.cloud.uploadFile({
          cloudPath: cloudPath, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          formData: {},
          success(res) {
            console.log("成功了", res);
            // console.log(cloudPath);
            wx.hideLoading();
            var fileID = res.fileID;
            // const data = JSON.parse(res.data); //获取到的json 转成数组格式 进行赋值 和渲染图片
            var fileID = res.fileID;
            console.log(fileID);
            _this.editorCtx.insertImage({
              src: fileID,
              data: {
                id: "abcd",
                role: "god"
              },
              success: function() {
                console.log("insert image success");
              }
            });
          },
          fail(e) {
            wx.hideLoading();
            console.log(e);
          },
          complete(e) {
            wx.hideLoading();
            console.log(e);
          }
        });
      }
    });
  },
  getEditorValue(e) {
    this.setData({
      ["formData.content"]: e.detail.html
    });
  },
  // insertImage() {
  //     const that = this
  //     wx.chooseImage({
  //         count: 1,
  //         success: function () {
  //         that.editorCtx.insertImage({
  //             src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
  //             data: {
  //             id: 'abcd',
  //             role: 'god'
  //             },
  //             success: function () {
  //             console.log('insert image success')
  //             }
  //         })
  //         }
  //     });
  // },
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ["original", "compressed"], //可选择原图或压缩后的图片
      sourceType: ["album", "camera"], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths);
        this.data.images = images.length <= 3 ? images : images.slice(0, 3);
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
