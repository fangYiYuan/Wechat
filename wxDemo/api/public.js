const movie_showing = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items';
const movie_free_stream = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items';
const movie_latest = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items';
const movie_detail = 'https://m.douban.com/rexxar/api/v2/movie'
const movie_free_talk = 'https://m.douban.com/rexxar/api/v2/recommend_feed'
// const movie_free_talk = 'https://m.douban.com/rexxar/api/v2/recommend_feed?next_date=''&for_mobile=1'
let params = {
  start: 0,
  count: 6
}
let fail = function (){
  wx.showToast({
    title: '请求数据失败',
    image: '../imgs/fail.png',
    duration: 2000
  })
}
let getMovieShowing = function (success, data = params) {
  wx.request({
    url: movie_showing,
    data: data,
    success,
    fail
  })
}
let getMovieFreeStream = function (success, data = params) {
  wx.request({
    url: movie_free_stream,
    data: data,
    success,
    fail
  })
}
let getMovieLatest = function (success, data = params) {
  wx.request({
    url: movie_latest,
    data: data,
    success,
    fail
  })
}
let getMovieDetail = function (success, filmId) {
  wx.request({
    url: movie_detail + '/' + filmId,
    success,
    fail
  })
}
let getMovieTalkList = function (success, data = params, filmId) {
  wx.request({
    url: movie_detail + '/' + filmId + '/interests',
    data,
    success,
    fail
  })
}
let getMovieFree = function (success) {
  wx.request({
    url: movie_free_talk,
    data: {
      for_mobile: 3,
      next_date: ''
    },
    success,
    fail
  })
}
module.exports = {
  getMovieShowing, getMovieFreeStream, getMovieLatest, getMovieDetail, getMovieTalkList, getMovieFree
}