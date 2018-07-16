//iƒndex.js - toDo
//获取应用实例
// TODO
// today task first (TODO first, DONE second)
// according to time for other tasks 
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
    isCheckedList: [],
    //The inital width of delete button（rpx）
    delBtnWidth: 180,
    list: []
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
    this.initEleWidth()
  },
  /** Render database data to the page **/
  refreshPage: function() {
    var isCheckedList = []
    var list = []
    var tmp_res = []
    const query = Bmob.Query("missionTable");
    query.find().then(res => {
      tmp_res = res.reverse()
      for (var i = 0; i < res.length; i++) {
        isCheckedList[i] = tmp_res[i]['status']
        list[i] = ""
      }
      this.setData({
        res: tmp_res,
        isCheckedList: isCheckedList,
        list: list
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
  },
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        // Set the horizontal position of inital touch point
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    if (e.touches.length == 1) {
      // The horizontal position of touch finger
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      // Get the item idx 
      var index = e.currentTarget.dataset.id;
      var list = this.data.list;
      if (index >= 0) {
        list[index] = txtStyle;
        //Update the style list
        this.setData({
          list: list
        });
      }
    }
  },
  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.id;
      var list = this.data.list;
      console.log(e);
      if (index >= 0) {
        list[index] = txtStyle;
        //更新列表的状态
        this.setData({
          list: list
        });
      }
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件
  delItem: function(e) {
    //获取列表中要删除项的下标
    var index = e.target.dataset.id;
    var objectId = e.target.id;
    console.log(objectId)
    this.delData(objectId)
    var list = this.data.list;
    //移除列表中下标为index的项
    list.splice(index, 1);
    //更新列表的状态
    this.setData({
      list: list,
    });
  },
  delData: function(id) {
    const query = Bmob.Query('missionTable');
    query.destroy(id).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.refreshPage()
  }
})