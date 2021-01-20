import {network} from "../index/network"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var type = options.type
    var id = options.id
    network.getItemDetail({
      type,
      id,
      success:function(data){
        // console.log(data)
        var genres = data.genres
        if(genres.length > 0){
          genres = genres.join('/');
       }
        var actors = data.actors
        var actorName = []
        if(actors.length > 0){
          for(let i = 0; i < 3;i++){
            actorName.push(actors[i].name)
          }
        }
        actorName = actorName.join('/')
        var director = data.directors[0].name
        var text = actors.length > 0?"(导演)/":"(导演)"
        var author = director + text + actorName
        var tags = []
        for(let i = 0; i < data.tags.length; i++){
          tags.push(data.tags[i].name)
        }
        var rate = data.rating.value
        that.setData({
          data,
          genres,
          author,
          tags,
          rate
        })
      }
    })
    network.getItemComments({
      id,
      type,
      success:function(data){
        var comments = data.interests
        // console.log(data)
        var total = data.total
        // console.log(total,comments)
        that.setData({
          total,
          comments,
          type,
          id
        })
      }
    })
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
    wx.pageScrollTo({
     scrollTop: 0,
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