import _validate from './_validate'

const userRule = {
  userName: {
    test: /^[0-9A-Za-z]{5,12}$/,
    message: '只能使用数字或英文字母(不区分大小写)，长度为5-12个字符'
  },
  nickName: {
    test: /^.|\n{1,12}$/,
    message: '长度为1-12个字符'
  },
  password: {
    test: /^(.|\n){6,16}$/,
    message: '长度为6-16个字符'
  },
  confirm: {
    test: function (data) {
      let test = /^.|\n{6,16}$/
      test.test(data.confirm)
      return data.password === data.confirm
    },
    message: '两次密码不一致或密码格式错误'
  },
  avatar: {
    test: /[a-zA-z]+:[^\s]*/,
    message: '图片错误'
  },
  gender: {
    test: /^[0-2]{1}$/,
    message: '性别错误'
  }
}

export default function (data) {

  return _validate(userRule, data)
}