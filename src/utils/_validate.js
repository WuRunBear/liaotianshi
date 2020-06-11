/**
 * 验证数据的方法
 * @param {Object} Rule 验证规则
 * @param {Object} data 待验证的数据
 */
export default function (Rule, data) {
  let res = {}
  for (const key in data) {
    if (data.hasOwnProperty(key) && Rule[key]) {
      if (Rule[key].test instanceof Function ? Rule[key].test(data) : Rule[key].test.test(data[key])) {
        res[key] = true
      } else {
        res[key] = Rule[key].message
      }
    }
  }
  return res
}