// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigateTitle: '',
        movies: {},
        requestUrl: '',
        totalCount: 0,
        isEmpty: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var category = options.category;
        this.setData({
            navigateTitle: category
        });
        var dataUrl = "";
        switch (category) {
            case '正在热映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
                break;
            case '即将上映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
                break;
            case '豆瓣TOP250':
                dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
                break;
        }
        this.setData({
            requestUrl: dataUrl
        });
        util.http(dataUrl, this.processDoubanData);
    },
    // onScrollLower: function(event) {
    //     var nextUrl = this.data.requestUrl + '?start' + this.data.totalCount + '&count=20';
    //     util.http(nextUrl, this.processDoubanData);
    // },
    processDoubanData: function (moviesDouban) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                stars: util.converToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp);
        }
        //老版本处理方式
        // var totalCount =  this.data.totalCount += 20;
        // this.setData({
        //     totalCount: totalCount
        // })
        var totalMoives = {}
        //如果要绑定新加载的数据，那么就要和已有的数据合并到一起
        if (!this.data.isEmpty) {
            totalMoives = this.data.movies.concat(movies);
        } else {
            totalMoives = movies;
            this.data.isEmpty = false;
        }
        this.setData({
            movies: totalMoives
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        this.data.totalCount += 20;
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (options) {
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle,
            success: function (res) {
            }
        });
    },


    onMovieTap: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId
        })
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

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        var refreshUrl = this.data.requestUrl + '?start=0&count=20';
        this.data.movies = {};
        this.data.isEmpty = true;
        this.data.totalCount = 0;
        util.http(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
        util.http(nextUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})