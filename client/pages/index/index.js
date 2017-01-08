/*
* 作者： 刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

import api from '../../utils/api'
import event from '../../utils/event'
import {format} from '../../utils/util'

let col1H = 0;
let col2H = 0;

Page({

    data: {
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        col1: [],
        col2: [],
        page: 1
    },

    

    onImageLoad (e) {
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width;         //图片原始宽度
        let oImgH = e.detail.height;        //图片原始高度
        let imgWidth = this.data.imgWidth;  //图片设置的宽度
        let scale = imgWidth / oImgW;        //比例计算
        let imgHeight = oImgH * scale;      //自适应高度

        let images = this.data.images;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }

        if(imageObj)
            imageObj.height = imgHeight;

        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;

        if (col1H <= col2H) {
            col1H += imgHeight;
            col1.push(imageObj);
        } else {
            col2H += imgHeight;
            col2.push(imageObj);
        }

        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2
        };

        if (!loadingCount) {
            data.images = [];
        }

        this.setData(data);
    },

    loadImages() {
        

        var that = this
        wx.showToast({
        title: '拼命加载中...',
        icon: 'loading',
        duration: 2000
        })
        wx.request({
            url:'https://api.getweapp.com/vendor/tngou/tnfs/api/list?page='+this.data.page,
            success: function(res) {    
                wx.hideToast()
                that.setData({
                    loadingCount: res.data.tngou.length,
                    images: res.data.tngou,
                    page: that.data.page+1
                })
            }
        })
       
    },
    goProfile(e) {
        if(!wx.getStorageSync('token')){
            wx.showModal({
                title: '提示',
                content: '不是会员不可查看联系方式',
                confirmText: '成为会员',
                confirmColor: '#993399',
                success: function(res) {
                    if (res.confirm) {
                    wx.switchTab({
                        url: '/pages/account/account'
                        })
                    }
                }
                })
            return
        }
        wx.navigateTo({
            url:'../profile/profile?avatar='+e.currentTarget.dataset.avatar
        })
    },
    onLoad () {
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });

                this.loadImages();
            }
        })
    }

})