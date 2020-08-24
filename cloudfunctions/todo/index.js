const cloud = require('wx-server-sdk')
cloud.init({
  env: 'xly-ba27v'
})

const db = cloud.database()
const todo = db.collection('todo')
// 云函数入口函数
exports.main = async (event, context) => {
  // console.lo
  const wxContext = cloud.getWXContext()
  return await todo.add({
    data: {
      ...event.todo,
      _openid: wxContext.OPENID,
    }
  }).then(res => {
    console.log(res)
  })
}