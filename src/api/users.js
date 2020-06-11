import axios from 'axios'
import urls from '../conf/url';
import store from '../store/index';

const url = `${urls.apiUrl}users`

// 添加请求拦截器
axios.interceptors.request.use(function (config) {

  return config;
}, function (error) {

  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {

  ;
  (response.data.errno === 10003) && _logout()

  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


function _logout() {
  store.commit('logout')
  // document.location = '/'
}

/**
 * 登录 api
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
function login({
  userName,
  password
}) {
  return {
    method: 'post',
    url: `${url}/login`,
    data: {
      userName,
      password
    }
  }
}

/**
 * 登录验证
 */
function isLogin() {
  return {
    method: 'get',
    url: `${url}/isLogin`
  }
}

/**
 * 注册
 * @param {String} userName 用户名
 * @param {String} nickName 昵称
 * @param {String} password 密码
 * @param {String} gender 性别
 * @param {String} avatar 头像地址
 */
function register({
  userName,
  nickName,
  password,
  gender,
  avatar,
}) {

  return {
    method: 'post',
    url: `${url}/register`,
    data: {
      userName,
      nickName,
      password,
      gender,
      avatar,
    }
  }
}

/**
 * 验证用户名是否可用
 * @param {string} userName 用户名
 */
function isExist(userName) {

  return {
    method: 'get',
    url: `${url}/isExist`,
    params: {
      userName,
    }
  }
}

/**
 * 查询用户
 * @param {String} selectText 查询的字符串
 * @param {String} pageSize 每页显示的条数
 * @param {String} page 页数
 */
function selectUser({
  selectText,
  selectMode,
  pageSize,
  page
}) {
  return {
    method: 'post',
    url: `${url}/selectUser`,
    data: {
      selectText,
      selectMode,
      pageSize,
      page
    }
  }
}

/**
 * 修改用户信息
 * @param {String} nickName 昵称
 * @param {Number} gender 性别
 * @param {String} avatar 头像
 * @param {String} city 地址
 */
function changeUserInfo({
  nickName,
  gender,
  avatar,
  city
}) {
  return {
    method: 'post',
    url: `${url}/changeUserInfo`,
    data: {
      nickName,
      gender,
      avatar,
      city
    }
  }
}

/**
 * 退出登录
 */
function logout() {
  return {
    method: 'get',
    url: `${url}/logout`,
  }
}

export default {
  login,
  register,
  isExist,
  isLogin,
  selectUser,
  changeUserInfo,
  logout,
}