// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init({
  env: 'xly-ba27v'
})

// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    uri: 'http://japi.juhe.cn/qqevaluate/qq',
    qs: {
      qq: event.qq,
      key: event.key
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

return rp(options)
// rp(options)
// .then(function (repos) {
//     console.log('User has %d repos', repos.length);
//     console.log(repos)
// })
// .catch(function (err) {
//     // API call failed...
// });
}