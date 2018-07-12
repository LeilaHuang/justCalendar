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
    res: [],
    //isCheckedList is the list of switches statuses.
    isCheckedList: []
  },
  /** Event happens after change the switch **/
  switchChange: function(e) {
    var isCheckedList = this.data.isCheckedList
    // Get the index - 0,1,2...
    var idx = e.target.dataset.id
    // Get the data object id from database - "cdd972779c","7e33c203e4"...
    var id = e.target.id
    // Get the switch status
    var status = e.detail.value
    isCheckedList[idx] = e.detail.value
    this.setData({
      isCheckedList: isCheckedList,
      userCellId: id
    })
    this.editMissionStatus(id, status)
  },
  /** Refresh Page when Change Tap **/
  onShow: function(e) {
    this.refreshPage()
  },
  /** Initial Page **/
  onLoad: function(e) {
    this.refreshPage()
  },
  /** Render database data to the page **/
  refreshPage: function() {
    var isCheckedList = []
    var tmp_res = []
    const query = Bmob.Query("missionTable");
    query.find().then(res => {
      tmp_res = res.reverse()
      for (var i = 0; i < res.length; i++) {
        isCheckedList[i] = tmp_res[i]['status']
        console.log(isCheckedList[i])
      }
      this.setData({
        res: tmp_res,
        isCheckedList: isCheckedList
      })
    });
  },
  /** Modify the 'status' data according to the switch status and object ID **/
  editMissionStatus: function(id, status) {
    const query = Bmob.Query('missionTable');
    query.get(id).then(res => {
      res.set('status', status)
      res.save()
    }).catch(err => {
      console.log(err)
    })
  }
})