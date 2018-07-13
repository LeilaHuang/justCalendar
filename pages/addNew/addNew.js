//addNew.js
//获取应用实例
/** TODO
# About the picker, the Due Date and Due Time, shouldn't earlier than today.
# The period of the due time should be 10 min, not 1 min.
**/

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
    titleInput: "",
    descripInput: "",
    dateValue: 'click to choose due date',
    timeValue: 'due time'
  },
  // Get title input value
  titleInputEvent: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  // Get description input value
  desInputEvent: function(e) {
    this.setData({
      descripition: e.detail.value
    })
  },
  submitMission: function(e) {
    // Get System Time
    var time = util.formatTime(new Date());
    const query = Bmob.Query('missionTable');
    // Save a mission
    // when compare use new Date(dueTime)
    var dueDate = this.data.dateValue
    var dueTime = this.data.timeValue + ":00"
    query.set("title", this.data.title)
    query.set("descripition", this.data.descripition)
    query.set("status", false)
    query.set("time", time)
    query.set("dueDate", dueDate)
    query.set("dueTime", dueTime)
    console.log(dueTime)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.setData({
      titleInput: '',
      descripInput: '',
      dateValue: ' 请选择您的日期',
      timeValue: ' 请选择您的时间'
    })
  },
  onLoad: function() {

  },
  timePickerBindchange: function(e) {
    this.setData({
      timeValue: e.detail.value
    })
  },
  datePickerBindchange: function(e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
})