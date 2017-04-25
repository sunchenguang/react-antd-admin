/**
 * Created by 80920 on 2017/4/26.
 */
// 上传相关配置
module.exports = {
  // 上传图片和上传普通文件分别配置
  image: '/uploadImage',  // 默认的上传图片接口
  imageSizeLimit: 1500,  // 默认的图片大小限制, 单位KB

  file: '/uploadFile',  // 默认的上传文件的接口
  fileSizeLimit: 10240,  // 默认的文件大小限制, 单位KB
}
