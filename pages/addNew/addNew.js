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
    titleInput: "",
    descripInput: "",
    dateValue: 'click to choose due date',
    timeValue: 'click to choose due time',
    currentDate: '',
    multiArray: [
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '10', '20', '30', '40', '50']
    ],
    multiIndex: [0, 0],
    objectMultiArray: [
      [{
          id: 0,
          name: '00'
        },
        {
          id: 1,
          name: '01'
        },
        {
          id: 2,
          name: '02'
        },
        {
          id: 3,
          name: '03'
        },
        {
          id: 4,
          name: '04'
        },
        {
          id: 5,
          name: '05'
        },
        {
          id: 6,
          name: '06'
        },
        {
          id: 7,
          name: '07'
        },
        {
          id: 8,
          name: '08'
        },
        {
          id: 9,
          name: '09'
        },
        {
          id: 10,
          name: '10'
        },
        {
          id: 11,
          name: '11'
        },
        {
          id: 12,
          name: '12'
        },
        {
          id: 13,
          name: '13'
        },
        {
          id: 14,
          name: '14'
        },
        {
          id: 15,
          name: '15'
        },
        {
          id: 16,
          name: '16'
        },
        {
          id: 17,
          name: '17'
        },
        {
          id: 18,
          name: '18'
        },
        {
          id: 19,
          name: '19'
        },
        {
          id: 20,
          name: '20'
        },
        {
          id: 21,
          name: '21'
        },
        {
          id: 22,
          name: '22'
        },
        {
          id: 23,
          name: '23'
        }
      ],
      [{
          id: 0,
          name: '00'
        },
        {
          id: 1,
          name: '10'
        },
        {
          id: 2,
          name: '20'
        },
        {
          id: 3,
          name: '30'
        },
        {
          id: 3,
          name: '30'
        },
        {
          id: 4,
          name: '40'
        },
        {
          id: 5,
          name: '50'
        }
      ]
    ],
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
      dateValue: ' click to choose due date',
      timeValue: ' click to choose due time'
    })
  },
  onLoad: function() {
    var date = new Date()
    var currentDate = date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate();
    console.log(currentDate)
    this.setData({
      currentDate: currentDate,
    })
  },
  timePickerBindchange: function(e) {
    var hrIndex = e.detail.value[0]
    var minIndex = e.detail.value[1]
    var timeValue = this.data.multiArray[0][hrIndex] + ":" + this.data.multiArray[1][minIndex]
    this.setData({
      timeValue: timeValue
    })
    console.log(timeValue)
  },
  datePickerBindchange: function(e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
})