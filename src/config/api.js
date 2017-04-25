/**
 * Created by 80920 on 2017/4/26.
 */
// 对后端请求的相关配置
module.exports = {
  host: 'http://localhost:12345',  // 调用ajax接口的地址, 默认值空, 如果是跨域的, 服务端要支持CORS
  path: '/api',  // ajax请求的路径
  timeout: 15000,  // 请求的超时时间, 单位毫秒
}


