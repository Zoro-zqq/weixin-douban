import {network} from "../index/network"
//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function (options) {
    var that = this
   network.getMoviesUrl({
     success: function(movies){
       that.setData({
        movies: movies
       })
     }
   })
   network.getTvsUrl({
    success: function(tvs){
      that.setData({
      tvs: tvs
      })
    }
  })
  network.getShowsUrl({
    success: function(shows){
      that.setData({
      shows: shows
      })
    }
  })
  },
})
