//done.js
//获取应用实例
const app = getApp()
var Bmob = require('../../SDK/hydrogen-js-sdk/src/lib/app.js');
Bmob.initialize("4b4bdf19b95ce88a93502c4456ca63c7", "9fb8b4d1e82c6b3217a856d67f9a6744");

Page({
  data: {
    motto: 'calendar',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /** Refresh Page when Change Tap **/
  onLoad: function() {
    this.refreshPage()
  },
  /** Initial Page **/
  onShow: function() {
    this.refreshPage()
  },
  refreshPage: function() {
    const query = Bmob.Query("missionTable");
    query.equalTo("status", "==", true);
    query.find().then(res => {
      console.log(res)
      this.setData({
        res: res
      })
    });
  }

})