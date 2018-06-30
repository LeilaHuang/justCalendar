//calendar.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'calendar',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function () {
  },
  
  dayClick: function (event) {
    console.log(event.detail);
  }

})
