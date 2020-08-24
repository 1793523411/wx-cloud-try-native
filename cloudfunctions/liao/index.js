// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init({
  env: 'xly-ba27v'
})

// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    uri: `https://api.jisuapi.com/iqa/query?appkey=8d7d92e7e0c118d2&question=${event.val}`,
    qs: {
      key: event.key
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

return rp(options)
}