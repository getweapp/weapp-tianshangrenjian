/*
* 作者： 刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

// 这里可以使用自己服务器的接口
const API = 'http://192.168.1.188:5301'

const get = (cmd, params, callback) => {
    wx.showToast({
         title: '数据加载中...',
        icon: 'loading',
        duration: 2000
    })
    wx.request({
        url: API+(cmd?('/'+cmd):''),
        data: params,
        success: (res) => {
            wx.hideToast()
            const data = res.data
            if(data.code){
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    confirmColor: '#993399',
                    content: data.message,
                    success: (res) => {
                    }
                    })
                return
            }
            if(typeof(callback) == 'function')
                callback(data.data)
        }
    })
}

const post = (cmd, params, callback) => {
    wx.showToast({
         title: '数据提交中...',
        icon: 'loading',
        duration: 2000
    })
    wx.request({
        url: API+(cmd?('/'+cmd):''),
        data: params,
        method: 'POST',
        success: (res) => {
            const data = res.data
            if(data.code){
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    confirmColor: '#993399',
                    content: data.message,
                    success: (res) => {
                    }
                    })
                return
            }
            if(typeof(callback) == 'function')
                callback(data.data)
        }
    })
}

export default {
    get: get,
    post: post
}