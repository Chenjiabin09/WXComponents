// component/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //显示时长
    duration:{
      type:Number,
      value:1000
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    content:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示toast
     * @param str  内容
     */
    show(str){
      if(str==undefined||str==null){
        str=''
      }
      this.setData({
        isShow:true,
        content:str
      })
      var duration=this.properties.duration
      var _this=this
      setTimeout(function(){
        _this.hide()
      }, duration)
    },
     /**
     * 隐藏toast
     */
    hide(){
      this.setData({
        isShow: false,
        content: ''
      })
    }
  }
})
