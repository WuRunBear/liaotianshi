import urls from '../conf/url'
const url = `${urls.apiUrl}friend`

/**
 * 验证是否为好友
 * @param {Number} friendId 待验证的ID
 */
function isFriend(friendId) {
  return {
    method: 'post',
    url: `${url}/isFriend`,
    data: {
      friendId
    }
  }
}

export default {
  isFriend
}