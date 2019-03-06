import api from '../../api/public.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    func: '',
    total: '',
    loading: true,
    movieList: [],
    loadUrl: '',
    params: {
      start: 0,
      count: 12
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.func = options.func
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMoreList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  getMoreList() {
    api[this.data.func](({ data: { total, subject_collection: { name }, subject_collection_items: list } }) => {
      this.data.total = total
      this.setData({
        title: name,
        movieList: this.data.movieList.concat(list),
        loading: false
      })
    }, this.data.params)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var newCount = this.data.params.start + this.data.params.count 
    if (this.data.params.start < this.data.total) {
      this.data.params.start = newCount
      this.getMoreList()
    }
  },
  loadDetail: (e) => {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.filmid
    })
  }
})