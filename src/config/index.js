/**
 * Created by 80920 on 2017/4/26.
 */
//配置文件的入口文件
// import api from './api'
// import DBTable from './dbTable'
// import login from './login'
// import upload from './upload'
// import global from './global'
// import sidebar from './sidebar'
const api = require('./api');
const DBTable = require('./dbTable');
const login = require('./login');
const upload = require('./upload');
const global = require('./global');
const sidebar = require('./sidebar');

module.exports = {
  // ...global,
  name: 'OOXX管理后台',  // 项目的名字
  favicon: 'http://jxy.me/favicon.ico',  // 设置网页的favicon, 可以是外链, 也可以是本地
  footer: '<a target="_blank" href="http://jxy.me">foolbear</a>版权所有 © 2015-2099',  // footer中显示的字, 可以嵌入html标签

  debug: true,  // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
  tabMode: {  // tab模式相关配置
    enable: false,  // 是否开启tab模式
    allowDuplicate: false,  // 同一个菜单项只允许一个tab
  },

  log: {
    level: 'info',  // 日志级别, 类似slf4j中的root logger, 目前支持debug/info/warn/error 4种级别
    // 除了root logger以外, 也可以为每个logger单独设置级别
    debug: [],
    info: [],
    warn: [],
    error: ['loggerA', 'loggerB'],  // 示例, 对于loggerA和loggerB使用error级别, 其他logger使用默认的info级别
  },
  api,
  login,
  upload,
  sidebar,
  DBTable,

  // 以下一些辅助的函数, 不要修改
  // 不能使用箭头函数, 会导致this是undefined

  /**
   * 是否要跨域请求
   *
   * @returns {boolean}
   */
  isCrossDomain() {
    if (this.api.host && this.api.host !== '') {
      return true;
    }
    return false
  },

  /**
   * 是否单点登录
   *
   * @returns {boolean}
   */
  isSSO() {
    if (this.login.sso && this.login.sso !== '') {
      return true;
    }
    return false;
  },

  /**
   * 获得api请求的路径
   *
   * @returns {*}
   */
  getAPIPath() {
    if (this.tmpApiPath) { // 缓存
      return this.tmpApiPath;
    }

    const paths = [];
    if (this.isCrossDomain()) {
      // 去除结尾的'/'
      const tmp = this.api.host;
      let index = tmp.length - 1;
      // 如果超出指定的 index 范围，charAt返回一个空字符串
      while (tmp.charAt(index) === '/') {
        index--;
      }
      if (index < 0) {
        paths.push('');
      } else {
        paths.push(tmp.substring(0, index + 1));
      }
    } else {
      paths.push('');
    }

    // js的字符串处理真是麻烦

    if (this.api.path) {
      const tmp = this.api.path;
      let begin = 0;
      let end = tmp.length - 1;

      while (tmp.charAt(begin) === '/') {
        begin++;
      }
      while (tmp.charAt(end) === '/') {
        end--;
      }
      if (begin > end) {
        paths.push('');
      } else {
        paths.push(tmp.substring(begin, end + 1));
      }
    } else {
      paths.push('');
    }

    const tmpApiPath = paths.join('/');
    this.tmpApiPath = tmpApiPath;
    return tmpApiPath;
  },
}
