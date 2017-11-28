var postsData = require('../../data/posts-data.js')
// pages/posts/posts.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //小程序总是会读取data对象来做数据绑定，这个动作我们成为动作A
        //而动作A的解析是在onLoad事件执行后发生的。
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({ posts_key: postsData.postList });
    },

    onPostTap: function(event) {
        var postId = event.currentTarget.dataset.postid;
        // console.log('on post id is ' + postId);
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId,
        })
    
    },

    onSwiperTap: function(event) {
        //target指的是当前点击的组件
        //currentTarget指的是时间捕获的组件
        //target这里指的是image，而currentTarget指的是swiper
        var postId = event.target.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId,
        })
    }
})
