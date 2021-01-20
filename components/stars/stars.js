// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate:{
      type:Number,
      value:0.0,
      observer(newVal,oldVal,changedPath){
        this.updataRate()
      }
    },
    starsize:{
      type:Number,
      value:20,
    },
    fontsize:{
      type:Number,
      value:20
    },
    fontcolor:{
      type:String,
      value: "#ccc"
    },
    istext:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    updataRate: function(){
      var that = this
      var rate = that.properties.rate
      var intrate = parseInt(rate)
      var ratelight = parseInt(intrate / 2)
      var ratehalf = parseInt(intrate % 2)
      var rategray = 5 - ratelight - ratehalf
      var lights = []
      var halfs = []
      var grays = []
      for(let index = 1; index <= ratelight ;index++){
        lights.push(index)
      }
      for(let index = 1; index <= ratehalf ;index++){
       halfs.push(index)
      }
      for(let index = 1; index <= rategray ;index++){
        grays.push(index)
      }
      var ratetext = rate && rate > 0?rate.toFixed(1):"暂无评分"
      this.setData({
        lights: lights,
        halfs: halfs,
        grays: grays,
        ratetext: ratetext
      })
    }
  },
  lifetimes:{
    attached:function(){
      this.updataRate()
    }
  }
})
