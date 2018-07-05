//index.js - toDo
//获取应用实例
const app = getApp()
var Bmob = require('../../SDK/hydrogen-js-sdk/src/lib/app.js');
Bmob.initialize("4b4bdf19b95ce88a93502c4456ca63c7", "9fb8b4d1e82c6b3217a856d67f9a6744");

Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    switchChecked:false,
    res:[]
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
  onLoad: function() {
    const query = Bmob.Query("missionTable");
    query.find().then(res => {
      console.log(res[0])
      this.setData({
        res: res
      })
    });
  }
})