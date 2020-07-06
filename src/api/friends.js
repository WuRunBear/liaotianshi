import urls from '../conf/url'
const url = `${urls.apiUrl}/friend`

export default {
  /**
 * 验证是否为好友
 * @param {Number} friendId 待验证的ID
 */
  isFriend(friendId) {
    return {
      method: 'post',
      url: `${url}/isFriend`,
      data: {
        friendId
      }
    }
  },

  /**
  * 添加好友
  * @param {Object} friend 添加的好友
  */
  addFriend(friend) {
    return {
      method: 'post',
      url: `${url}/addFriend`,
      data: friend
    }
  },

  /**
  * 获取好友列表
  */
  getFriendList() {
    return {
      method: 'get',
      url: `${url}/getFriendList`,
    }
  },

  changeFriendInfo(newData) {
    return {
      method: 'post',
      url: `${url}/changeFriendInfo`,
      data: newData
    }
  }
}