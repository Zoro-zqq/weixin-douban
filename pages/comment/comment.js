import {network} from "../index/network"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    start:0,
    count:20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData(options)
    this.getItemComment(1)
  },
  getItemComment:function(start){
    var that = this
    var data = this.data
    if(start > that.data.start){
      that.setData(
        {
          nextloading:true
        }
      )
    }else{
      that.setData({
        preloading:true
      })
    }
    network.getItemComments({
      type: data.type,
      id: data.id,
      start: start,
      count: 20,
      success: function(data){
        var total = data.total
        var comments = data.interests
        that.setData({
          total,
          comments,
          start,
          preloading: false,
          nextloading:false
        })
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    })
  },
  onItemTapEvent:function(event){
    wx.navigateBack({})
  },
  onPreItemTap:function(event){
    var that = this
    var oldStart = this.data.start
    var count = this.data.count
    if(oldStart - count > 0){
      var start = oldStart - count
      that.getItemComment(start)
    }
  },
  onNextItemTap:function(event){
    var oldStart = this.data.start
    var count = this.data.count
    var start = oldStart + count
    this.getItemComment(start)
  }
})