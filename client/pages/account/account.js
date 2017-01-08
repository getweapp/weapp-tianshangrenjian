/*
* 作者： 刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

import api from '../../utils/api'

Page({
  data: {
    avatar: '../../images/avatar.png',
    name: '未登录',
    authed: false
  },
  signIn() {
    
     wx.login({
      success: (res) => {
        const code = res.code
        if (code) {
         wx.getUserInfo({
          success: (res) => {
            console.log(code, res.encryptedData, res.iv)
            api.post('signIn', {
              code: code,
              encryptedData: res.encryptedData,
              iv: res.iv
            }, (data) => {
              console.log(data)
              this.setData({
                avatar: data.people.avatar,
                name: data.people.name,
                authed: true
              })
                try {
                    wx.setStorageSync('token', data.token)
                    wx.setStorageSync('people', data.people)
                } catch (e) {   
                  console.log(e) 
                }
                  wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
            })
         }
         })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  
  },
  signOut() {
    const token = wx.getStorageSync('token') || ''
    if(!token)
      return
    api.post('signOut', {token: token}, (data) => {
      wx.clearStorage()
      this.setData({
        avatar: '../../images/avatar.png',
        name: '未登录',
        authed: false
      })
    })
  },
  onLoad() {
    const people = wx.getStorageSync('people') || null
    if(!people)
      return
    this.setData({
      avatar: people.avatar,
      name: people.name,
      authed: true
    })
  }
})
