//calendar.js
//获取应用实例
/** TODO
# Once the number of due missions on a specific day is more than 3 but less than 5, the background color of this day should be YELLOW.
# Once the number of due missions on a specific day is more than 5, the background color of this day should be RED.
**/
const app = getApp()
var Bmob = require('../../SDK/hydrogen-js-sdk/src/lib/app.js');
Bmob.initialize("4b4bdf19b95ce88a93502c4456ca63c7", "9fb8b4d1e82c6b3217a856d67f9a6744");

Page({
  data: {
    motto: 'calendar',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    day_style: []
  },

  onLoad: function() {},

  dayClick: function(event) {
    // Set color for clicked item
    let day_style = new Array;
    day_style.push({
      month: 'current',
      day: event.detail['day'],
      color: 'white',
      background: '#8497ee'
    });
    this.setData({
      day_style
    });
    // Get due missions from the clicked day
    var month = event.detail['month']
    if (month < 10) {
      month = "0" + event.detail['month']
    }
    var dueDate = event.detail['year'] + "-" + month + "-" + event.detail['day']
    console.log(dueDate)
    const query = Bmob.Query("missionTable");
    query.equalTo("dueDate", "==", dueDate);
    query.find().then(res => {
      console.log(res[0])
      this.setData({
        res: res
      })
    });
  }

})