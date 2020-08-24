// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'xly-ba27v'
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  var date = new Date();
  try {
    return await db.collection('todo').where({
      completed: true,
      year:date.getFullYear(),
      month:date.getMonth()+1,
      day:date.getDate(),
    })
    .update({
      data: {
        remove:true
      },
    })
  } catch(e) {
    console.error(e)
  }
}