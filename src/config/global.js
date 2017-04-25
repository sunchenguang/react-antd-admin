/**
 * Created by 80920 on 2017/4/26.
 */
module.exports = {
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
}
