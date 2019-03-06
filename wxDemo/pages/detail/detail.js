
import api from '../../api/public.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    filmId: '',
    total: '',
    detailData: '',
    mGenres: '',
    talkList: [],
    params: {
      start: 0,
      count: 12,
      order_by: 'time'
    },
    collectData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(api)
    // console.log(options)
    this.data.filmId = options.id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    api.getMovieDetail( (res) => {
      // console.log(res)
      let data = res.data
      let genres = data.genres[0]
      if (data.genres[1]) {
        genres = data.genres[0] + ' / ' + data.genres[1]
      } else if (data.genres[2]) {
        genres = data.genres[0] + ' / ' + data.genres[1] + ' / ' + data.genres[2]
      }
      // let genres = data.genres[0] + ' / ' + data.genres[1] + ' / ' + data.genres[2]
      this.setData({
        detailData: data,
        mGenres: genres
      })
    }, this.data.filmId)
    this.movieTalkList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  movieTalkList () {
    api.getMovieTalkList((res) => {
      this.data.total = res.data.total
      this.setData({
        talkList: this.data.talkList.concat(res.data.interests),
        loading: false
      })
    }, this.data.params, this.data.filmId)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var count = this.data.params.start + this.data.params.count
    if (count < this.data.total) {
      this.setData({
        loading: true
      })
      this.data.params.start = count
      this.movieTalkList()
    }
  },
  collectBtn:function () {
    // wx.setStorageSync("collect", 2)let temp = []
    console.log(app)
    if (!app.userInfo) {
      wx.showModal({
        title: 'tip',
        content: '请您先授权！',
      })
      return;
    }
    let temp = wx.getStorageSync("collect")
    if (temp === '') {
      temp = {}
    }
    if (temp[this.data.filmId]) {
      wx.showToast({
        title: '已经收藏过啦！',
        image: '../../imgs/fail.png',
        duration: 2000
      })
      return;
    }
    temp[this.data.filmId] = this.data.detailData
    wx.setStorageSync("collect", temp)
    wx.showToast({
      title: '收藏成功！',
      icon: 'success',
      duration: 2000
    })
  }
})