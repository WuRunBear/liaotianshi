/**
 * 验证文件的函数
 * @param {Object} files 待检验的文件
 * @param {String} verifyType 验证的类型
 */
export default function (files, verifyType) {
  if (verifyType !== '') {
    verifyType = verifyType.split(',')

    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const element = files[key];

        for (const key in verifyType) {
          if (verifyType.hasOwnProperty(key)) {
            const verifytype = verifyType[key];

            if (_getType(verifytype) === _getType(element.type)) {
              return true
            } else {
              return false
            }
          }
        }
      }
    }
  }
  return true
}

function _getType(type) {
  return type.split('/')[0]
}