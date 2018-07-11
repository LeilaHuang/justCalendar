//iƒndex.js - toDo
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
    switchChecked: false,
    res: []
  },
  switchChange: function(e) {
    var id = e.target.id
    console.log(id)
    if (e.detail.value === false) {
      this.editMissionStatus(id, false)
      this.setData({
        isLineThroued: '',
        isFinished: '#ffe0d6'
      })
    } else {
      this.editMissionStatus(id,true)
      this.setData({
        isLineThroued: 'line-through',
        isFinished: '#f6f6f6'
      })
    }
  },
  onShow: function(e) {
    this.refreshPage()
  },
  onLoad: function(e) {
    this.refreshPage()
  },
  refreshPage:function(){
    const query = Bmob.Query("missionTable");
    query.find().then(res => {
      console.log(res.length)
      this.setData({
        res: res.reverse()
      })
    });
  },
  editMissionStatus: function (id, status){
    const query = Bmob.Query('missionTable');
    query.get(id).then(res => {
      console.log(res)
      res.set('status', status)
      res.save()
    }).catch(err => {
      console.log(err)
    })
  }
})