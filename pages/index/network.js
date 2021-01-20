import {urls} from "../../utils/urls"
const network = {
  getMoviesUrl:function(params){
    params.type = 'movie'
    this.getItemUrl(params)
  },
  getTvsUrl: function(params){
    params.type = 'tv'
    this.getItemUrl(params)
  },
  getShowsUrl: function(params){
    params.type = 'show'
    this.getItemUrl(params)
  },
  getItemUrl: function(params){
    var url = ''
    var count = params.count?params.count:7
    if(params.type === 'movie'){
      url = urls.movieList
    }else if(params.type === 'tv'){
      url = urls.tvList
    }else{
      url = urls.showList
    }
    wx.request({
      url: url,
      data:{
        count: count
      },
      success:function(res){
        var items = res.data.subject_collection_items
        var itemsCount = items.length
        var left  = itemsCount % 3
        if(left === 2){
          items.push(null)
        }
        if(params && params.success){
          params.success(items)
        }
      }
    })
  },
  getItemDetail:function(params){
    var type = params.type
    var id = params.id
    var url = ""
    if(type === "movie"){
      url = urls.movieDetail + id
    }else if(type === "tv"){
      url = urls.tvDetail + id
    }else{
      url = urls.showDetail + id
    }
    wx.request({
      url: url,
      success: function(res){
        if(params.success){
          params.success(res.data)
        }
      }
    })
  },
  getItemComments:function(params){
    var id = params.id
    var start = params.start?params.start:0
    var count = params.count?params.count:3
    var type = params.type
    var url = ''
    if(type === 'movie'){
      url = urls.movieComments(id,start,count)
    }else if(type === 'tv'){
      url = urls.tvComments(id,start,count)
    }else{
      url = urls.showComments(id,start,count)
    }
    wx.request({
      url: url,
      success: function(res){
        if(params.success){
          params.success(res.data)
        }
      }
    })
  },
  getSearch:function(params){
    var q = params.value
    var url = urls.searchUrl(q)
    wx.request({
      url: url,
      success:function(res){
        var subjects = res.data.subjects
        if(params.success){
          params.success(subjects)
        }
      }
    })
  }
}
export {network}