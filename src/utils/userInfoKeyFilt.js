//过滤userinfo的属性名
function userInfoKeyFilt(value) {
  if (!value) return ''

  switch (value.toString()) {
    case 'avatar':
      return '头像'
      break

    case 'nickName':
      return '昵称'
      break

    case 'userName':
      return '账号名'
      break

    case 'gender':
      return '性别'
      break

    case 'city':
      return '城市'
      break

    default:
      // return value.toString()
      break
  }
}

export default userInfoKeyFilt