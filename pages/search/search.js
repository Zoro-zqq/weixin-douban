// pages/search/search.js
import {network} from "../index/network"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    histories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'searched',
      success:function(res){
        that.setData({
          histories: res.data
        })
      }
    })
  },

  onSearchInputEvent: function(event){
    var value = event.detail.value
    var that = this
    if(!value || value === ""){
      that.setData({
        subjects:null
      })
      return
    }
    network.getSearch({
      value,
      success:function(subjects){
        that.setData({
          subjects
        })
      }
    })
  },

  onItemTapEvent:function(event){
    var id = event.currentTarget.dataset.id
    var title = event.currentTarget.dataset.title
    var histories = this.data.histories
    var isExisted = false
    if(histories.length >= 1){
      for(let i = 0; i < histories.length;i++){
        var movie = histories[i]
        if(movie.id = id){
          isExisted = true
          break
        }
      }
    }
    if(!isExisted){
      histories.push({id,title})
      wx.setStorage({
        data: histories,
        key: 'searched',
      })
    }
    wx.navigateTo({
      url: '/pages/detail/detail?type=movie&id='+id,
    })
  },

  onClear:function(event){
    wx.removeStorage({
      key: 'searched',
    })
    this.setData({
      histories: []
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