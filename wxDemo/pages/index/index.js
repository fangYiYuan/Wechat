
import api from '../../api/public.js'
const app = getApp()
// console.log(app)
Page({
  data: {
    movieList: [{
      func: '',
      title: "",
      list: []
    },{
      func: '',
      title: "",
      list: []
    }, {
      func: '',
      title: "",
      list: []
    }],
    loading: true
  },
  onReady: function() {
    api.getMovieFree((res) => {
      
    }),
    api.getMovieShowing(({ data: { total, subject_collection: { name } , subject_collection_items }}) => {
      this.setData({
        "movieList[0].title": name,
        "movieList[0].func": 'getMovieShowing',
        "movieList[0].list": subject_collection_items,
        "loading": false
      })
    }),
    api.getMovieLatest(({ data: { total, subject_collection: { name }, subject_collection_items } }) => {
      this.setData({
        "movieList[1].title": name,
        "movieList[1].func": 'getMovieLatest',
        "movieList[1].list": subject_collection_items,
        "loading": false
      })
    }),
    api.getMovieFreeStream(({ data: { total, subject_collection: { name }, subject_collection_items } }) => {
      this.setData({
        "movieList[2].title": name,
        "movieList[2].func": 'getMovieFreeStream',
        "movieList[2].list": subject_collection_items,
        "loading": false
      })
    })
  },
  loadMore: (e) => {
    wx.navigateTo({
      url: '../list/list?func=' + e.target.dataset.func
    })
  },
  loadDetail: (e) => {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.filmid
    })
  }
})