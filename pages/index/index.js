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
    res: [],
    isChecked : []
  },
  switchChange: function(e) {
    var isCheckedList = this.data.isChecked
    var idx = e.target.dataset.id
    var id = e.target.id
    var status = e.detail.value
    //console.log(status)
    //console.log(id)
    // this.setData({
      
    // })
    isCheckedList[idx] = e.detail.value
    this.setData({
      isChecked: isCheckedList,
      userCellId : id
    })
    this.editMissionStatus(id, status)
  },
  onShow: function(e) {
    this.refreshPage()
  },
  // onLoad: function(e) {
  //   this.refreshPage()
  // },
  refreshPage:function(){
    var isCheckedList = []
    var tmp_res = []
    const query = Bmob.Query("missionTable");
    query.find().then(res => {
      tmp_res = res.reverse()
      for (var i = 0; i < res.length;i++){
        isCheckedList[i] = tmp_res[i]['status']
        console.log(isCheckedList[i])
        }
      this.setData({
        res: tmp_res,
        isChecked:isCheckedList
      })
    });
  },
  editMissionStatus: function (id, status){
    const query = Bmob.Query('missionTable');
    query.get(id).then(res => {
      //console.log(res)
      res.set('status', status)
      res.save()
    }).catch(err => {
      console.log(err)
    })
  }
})