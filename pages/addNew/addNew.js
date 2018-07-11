//addNew.js
//获取应用实例
const app = getApp()

var util = require('../../utils/util.js');
var Bmob = require('../../SDK/hydrogen-js-sdk/src/lib/app.js');
Bmob.initialize("4b4bdf19b95ce88a93502c4456ca63c7", "9fb8b4d1e82c6b3217a856d67f9a6744");

Page({
  data: {
    motto: 'calendar',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: "",
    descripition: "",
    titleInput:"",
    descripInput:""
  },
  titleInputEvent: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  desInputEvent: function(e) {
    this.setData({
      descripition: e.detail.value
    })
  },
  submitMission: function(e) {
    var time = util.formatTime(new Date());
    this.setData({
      titleInput: '',
      descripInput: '',
    })
    const query = Bmob.Query('missionTable');
    query.set("title", this.data.title)
    query.set("descripition", this.data.descripition)
    query.set("status", false)
    query.set("time",time)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  onLoad: function() {

  }

})