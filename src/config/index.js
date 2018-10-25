const configInfo = require('./config.json')
const avatar = /^http?/gi.test(configInfo.avatar)
  ? configInfo.avatar
  : require(configInfo.avatar + '')
export default {
  ...configInfo,
  avatar: avatar
}
