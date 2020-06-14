import urls from '../conf/url'
const url = `${urls.apiUrl}/utils`

/**
 * 上传文件 api
 * @param {Object} files 文件
 * @param {Function} UploadProgress 获取传输百分比的回调函数
 */
function upload(files, UploadProgress) {

  let from = new FormData()

  for (const key in files) {
    if (files.hasOwnProperty(key)) {
      const element = files[key];
      from.append('files', element)
    }
  }

  return {
    method: 'post',
    url: `${url}/upload`,
    data: from,
    onUploadProgress(progress) {

      // 获取百分比
      progress.percent = Number.parseInt(progress.loaded / progress.total * 100)

      // 将百分比返回给回调函数
      UploadProgress && UploadProgress(progress)
    }
  }
}

export default {
  upload
}