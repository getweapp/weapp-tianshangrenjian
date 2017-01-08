/*
* 作者： 刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

import api from '../../utils/api'
import event from '../../utils/event'

Page({
  data: {
    avatar: ''
  },
  sendMessage() {
      const token = wx.getStorageSync('token') || ''
      api.post('messages', {token: token}, (data) => {
        console.log(data)
         wx.showModal({
      title: '提示',
      showCancel: false,
      confirmColor: '#993399',
      content: data.name+'约她成功',
      success: (res) => {
      }
      })
      })
 
     

  },
  onLoad(options) {
    this.setData({
      avatar: options.avatar
    })
  }
})