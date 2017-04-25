/**
 * Created by 80920 on 2017/4/26.
 */
// DBTable组件相关配置
module.exports = {
  pageSize: 50, // 表格每页显示多少条数据

  default: {  // 针对每个表格的默认配置
    showExport: true,  // 显示导出按钮, 默认true
    showImport: true,  // 显示导入按钮, 默认true
    showInsert: true,  // 显示新增按钮, 默认true
    showUpdate: true,  // 显示修改按钮, 默认true
    showDelete: true,  // 显示删除按钮, 默认true

    asyncSchema: false,  // 是否从服务端加载schema, 默认false
    ignoreSchemaCache: false,  // 是否忽略schema的缓存, 对于异步schema而言, 默认只会请求一次后端接口然后缓存起来
  },
}
