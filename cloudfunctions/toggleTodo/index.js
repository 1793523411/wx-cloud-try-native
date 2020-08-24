// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'xly-ba27v'
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  console.log(event)
  try {
    return await db.collection('todo').where({
      completed: !event.stu
    })
    .update({
      data: {
        completed: event.stu
      },
    })
  } catch(e) {
    console.error(e)
  }
}

