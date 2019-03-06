// pages/user/user.js
const app = getApp()
// console.log(app, '222')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: null,
    size: 0,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: (data) => {
        // console.log(data)
        app.userInfo = data.userInfo
        this.setData({
          userInfo: data.userInfo
        })
      }
    })
  },
  getUserInfo(e) {
    // console.log(e.detail.userInfo, '22222')
    // this.data.userInfo = e.detail.userInfo
    app.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
    }
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
    let collectList = wx.getStorageSync("collect")
    // console.log(collectList)
    let size = Object.keys(collectList).length
    this.setData({
      collectList,
      size
    })
  },
  loadDetail: (e) => {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.filmid
    })
  },
  cancelBtn: function (e){
    // console.log(e)
    let filmId = e.target.dataset.filmid
    let data = this.data.collectList
    delete data[filmId]
    let size = Object.keys(data).length
    wx.setStorageSync('collect', data)
    this.setData({
      collectList: data,
      size
    })
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