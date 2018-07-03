//index.js - toDo
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    switchChecked:false,
  },
  switchChange:function(e){
    if (e.detail.value === false){
      console.log("hhh")
      this.setData({
        isLineThroued: '',
        isFinished: '#ffe0d6'
      })
    }
    else{
      this.setData({
        isLineThroued : 'line-through',
        isFinished:'#f6f6f6'
      })
    }
  },
  onLoad: function() {}
})