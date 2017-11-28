// pages/posts/post-detail/post-detail.js
// 引入数据
var postsData = require('../../../data/posts-data.js');

var app = getApp();

Page({
    data: {
        isPlayingMusic: false
    },
    onLoad: function (option) {
        var gloablData = app.globalData;
        var postId = option.id;
        this.setData({
            currentPostId: postId
        })
        var postData = postsData.postList[postId];
        this.setData({ postData: postData });

        // var postsCollected = {
        //     1: 'true',
        //     2: 'false',
        //     3: 'true'
        // }

        var postsCollected = wx.getStorageSync('posts_collected');
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            });
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }

        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
            this.setData({
                isPlayingMusic : true
            })
        }

        this.setMusicMonitor();

    },


    setMusicMonitor: function () {
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentPostId;
        });
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        });
        wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        });

    },

    onCollectionTap: function (event) {

        // //更新文章是否收藏的缓存值
        // wx.setStorageSync('posts_collected', postsCollected);
        // //更新数据绑定变量，从而实现切换图片
        // this.setData({
        //     collected: postCollected
        // })
        // 同步调用
        this.getPostsCollectedSync();
        // 异步调用
        // this.getPostCollectedAsy();

    },

    getPostCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: 'posts_collected',
            success: function (res) {
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                //收藏和未收藏切换
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                //交互反馈
                that.showToast(postsCollected, postCollected);
            }
        })
    },

    getPostsCollectedSync: function () {
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[this.data.currentPostId];
        //收藏和未收藏切换
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        //交互反馈
        this.showToast(postsCollected, postCollected);
    },

    // showModal: function (postsCollected, postCollected) {
    //     var that = this;
    //     wx.showModal({
    //         title: '收藏',
    //         content: postCollected? '收藏该文章？' : '取消收藏该文章？',
    //         showCancel: 'true',
    //         cancelText: '取消',
    //         confirmText: '确认',
    //         success: function (res) {
    //             if (res.confirm) {
    //                 //更新文章是否收藏的缓存值
    //                 wx.setStorageSync('posts_collected', postsCollected);
    //                 //更新数据绑定变量，从而实现切换图片
    //                 that.setData({
    //                     collected: postCollected
    //                 })
    //             } else if (res.cancel) {

    //             }
    //         }
    //     })
    // },

    showToast: function (postsCollected, postCollected) {
        //更新文章是否收藏的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        //更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: postCollected
        })
        wx.showToast({
            title: postCollected ? '收藏成功' : '取消收藏',
            icon: 'success',
            duration: 1000
        })
    },

    onShareTap: function (event) {
        var itemList = [
            '分享给微信好友',
            '分享到朋友圈',
            '分享到QQ'
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success: function (res) {
                // res.cancel 用户是否点击取消
                //res.tapIndex 数组元素的序号，从0开始
                if (res.tapIndex) {

                }
                wx.showToast({
                    title: '该功能暂未开通',
                    icon: 'success',
                    duration: 1000
                })
            }
        })
    },
    onMusicTap: function (event) {
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId];
        var isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            });
        } else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg
            });
            this.setData({
                isPlayingMusic: true
            });
        }


    }

})
