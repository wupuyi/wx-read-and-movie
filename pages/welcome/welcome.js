// pages/welecome/welecome.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
});
Page({

    onTextTap: function() {
    },

    onTap : function() {
        //子父跳转
        // wx.navigateTo({
        //     url: '../posts/posts'
        // });
        wx.switchTab({
            url: '../posts/posts',
        })
        //平行跳转
        // wx.redirectTo({
        //     url: '../posts/posts',
        // })
    },

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // console.log("welcome page is hide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // console.log("welcome page is unload")
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
