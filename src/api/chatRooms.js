import urls from '../conf/url'
const url = `${urls.apiUrl}/chatRooms`

export default {
  /**
  * 获取私聊
  * @param {Number} friendId 好友Id
  */
  getOneToOneChat(friendId) {
    return {
      method: 'post',
      url: `${url}/getOneToOneChat`,
      data: {
        friendId
      }
    }
  },

  /**
  * 新建私聊
  * @param {Number} friendId 好友Id
  */
  newOneToOneChat(friendId) {
    return {
      method: 'post',
      url: `${url}/newOneToOneChat`,
      data: {
        friendId
      }
    }
  },

  /**
  * 获取群聊
  * @param {Number} roomId 群号
  * @param {Number} friendId 好友账号
  */
  getChatRoom({ roomId, friendId }) {
    return {
      method: 'post',
      url: `${url}/getChatRoom`,
      data: {
        roomId,
        friendId
      }
    }
  },
  /**
  * 获取聊天模式（群聊、私聊）
  * @param {Number} roomId 群号
  */
  getChatMode(roomId) {
    return {
      method: 'get',
      url: `${url}/getChatMode`,
      params: {
        roomId
      }
    }
  },
  // /**
  // * 获取好友列表
  // */
  // getFriendList() {
  //   return {
  //     method: 'get',
  //     url: `${url}/getFriendList`,
  //   }
  // },

  // changeFriendInfo(newData) {
  //   return {
  //     method: 'post',
  //     url: `${url}/changeFriendInfo`,
  //     data: newData
  //   }
  // }
}