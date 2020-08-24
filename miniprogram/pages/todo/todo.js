// pages/todo/todo.js
const app = getApp();
const db = wx.cloud.database()
//初始化数据库
// const db = wx.cloud.database();
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 文本框的数据模型
    input: "",
    // 任务清单数据模型
    todos: [],
    leftCount: 0,
    allCompleted: false,
    userinfo:{}
  },
  inputChangeHandle: function(e) {
    this.setData({ input: e.detail.value });
  },
  // 1. 先让按钮点击时执行一段代码
  addTodoHandle: function() {
    // 当添加按钮点击事件发生时执行的函数
    if (!this.data.input) return;
    var todos = this.data.todos;
    var date = new Date();
    todos.push({
      name: this.data.input,
      completed: false,
      year:date.getFullYear(),
      month:date.getMonth()+1,
      remove:false,
      day:date.getDate(),
      data:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getHours()+"-"+date.getMinutes()
    });
    var todo = {
      name: this.data.input,
      completed: false,
      year:date.getFullYear(),
      month:date.getMonth()+1,
      day:date.getDate(),
      remove:false,
      data:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getHours()+"-"+date.getMinutes()
    }
    var data = new Date()
    
  //  console.log(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate())
    // console.log(year)
    // console.log(month)
    // console.log(day)
    wx.cloud.callFunction({
      name:"todo",
      data:{
        todo:todo
      }
    }).then(res => {
      db.collection('todo').where({
        _openid:this.data._openid,
        day:date.getDate(),
        remove:false
      }).get().then(res => {
         this.setData({
         todos:res.data
       })
      //  console.log(this.data.todos)
       })
    })

    db.collection('todo').where({
      day:date.getDate(),
      completed:false
    }).count().then(res => {
      
    })
    this.setData({
      todos: todos,
      input: "",
      leftCount: this.data.leftCount + 1
    });
    
  },
  toggleTodoHandle(e) {
    // 切换当前点中的item的完成状态
    var leftCount = this.data.leftCount
    // console.log(e);
    var item_id = this.data.todos[e.currentTarget.dataset.index]._id;
    // console.log(item._id)
    var item = this.data.todos[e.currentTarget.dataset.index]
    db.collection('todo').doc(item_id).update({
      data: {
        completed:!item.completed
      }
    }).then( res => {
      // console.log(res)
      item.completed = !item.completed;
      leftCount = leftCount + (item.completed ? -1 : 1);
      this.setData({
        todos:this.data.todos,
        leftCount: leftCount
      })
      // console.log(item.completed)
      
    })
    // console.log(item.completed)
    // 根据当前任务的完成状态决定增加一个或者减少一个
    
    // this.setData({ todos: this.data.todos, leftCount: leftCount });
  },
  // 需要注意冒泡的问题
  removeTodoHandle(e) {
    wx.showModal({
      title: '😨小主真的要删除吗？',
      content: '删除后要对其负责，💔在历史中将找不到此条记录',
      cancelText:'手贱😢',
      confirmText:'删除😕',
      cancelColor:"#f00",
      success :res => {
        if (res.confirm) {
          var todos = this.data.todos;
    // item 就是splice方法中移除掉的元素
    // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
    var item_id = this.data.todos[e.currentTarget.dataset.index]._id;
    var item = todos.splice(e.currentTarget.dataset.index, 1)[0];
    db.collection('todo').doc(item_id).update({
      data: {
        remove:true,
        completed:true
      }
    }).then(res => {
      // console.log(res)
    })
    // console.log(item)
    // todos 中会移除掉 index 所指向的元素
    var leftCount = this.data.leftCount - (item.completed ? 0 : 1);
    this.setData({ todos: todos, leftCount: leftCount });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    
    
  },
  toggleAllHandle() {
    // this 在这里永远指向的是当前页面对象
    this.data.allCompleted = !this.data.allCompleted;
    var stu = this.data.allCompleted
    var todos = this.data.todos;
    var that = this;
    todos.forEach(function(item) {
      item.completed = that.data.allCompleted;
    });
    var leftCount = this.data.allCompleted ? 0 : this.data.todos.length;
    this.setData({ todos: todos, leftCount: leftCount });

    wx.cloud.callFunction({
      name:"toggleTodo",
      data:{
        stu:stu
      }
    }).then(res => {
      // console.log(res)
    })
  },
  clearHandle() {
    // var todos = []
    // this.data.todos.forEach(function (item) {
    //   if (!item.completed) {
    //     todos.push(item)
    //   }
    // })
    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
    wx.showModal({
      title: '🎉🎉你好厉害~~🎉🎉',
      content: '不过，你真的全部认真完成了吗？😩',
      cancelText:'抱歉😜',
      confirmText:'清空😯',
      cancelColor:"#f00",
      success:res => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name:"clearTodo",
          }).then(res => {
            // console.log(res)
          })
          var todos = this.data.todos.filter(function(item) {
            return !item.completed;
          });
          // todos => 新的未完成的任务列
          this.setData({ todos: todos });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData)
    this.checkUser();
    console.log(this.data)

  },
  // 检查是否有用户
  async checkUser() {
    // console.log(app.globalData)
    this.setData({
      userinfo:app.globalData.userinfo,
      _openid:app.globalData.id
    })
    var date = new Date();
   db.collection('todo').where({
     _openid:this.data._openid,
     day:date.getDate(),
     remove:false
   }).get().then(res => {
      this.setData({
      todos:res.data
    })
    // console.log(this.data.todos)
    })

    db.collection('todo').where(_.and([
      {
        _openid:this.data._openid
      },
      {
        day:date.getDate()
      },{
        completed:false
      },
      {
        remove:false
      }
    ])).count().then(res => {
      this.setData({
        leftCount:res.total
      })
      // if(res.total==0){
      //   wx.request({
      //     url: 'http://v.juhe.cn/joke/content/text.php?key=d91034639a13d2dc557f2a229a65d66b', //仅为示例，并非真实的接口地址
      //     header: {
      //       'content-type': 'application/json' // 默认值
      //     },
      //     success (res) {
      //       console.log(res.data)
      //     }
      //   })
      // }
    })

    if (!app.globalData.hasUser) {
      app.globalData.hasUser = false;
      return wx.switchTab({ url: "/pages/user/user" });
    }

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
