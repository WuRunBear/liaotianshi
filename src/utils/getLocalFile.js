/**
 * 读取本地文件
 * @param {Object} file 待读取的文件
 * @param {Function} callBack 读取文件完成后的回调函数
 */
export default function getLocalFile(file,callBack) {
  let reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onloadend = function(e){
    callBack(e.target.result)
  }
}