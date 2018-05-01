// pages/songlist/songlist.js
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    searchdate: '2016-09-01',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    let day = date.getDate(); //当月的天
    let month = date.getMonth() + 1; //月份，从0开始
    let year = date.getFullYear(); //年份
    const dday = day < 10 ? '0' + day : day;
    const dmonth = month < 10 ? '0' + month : month;

    let datestr=''+year+'-'+dmonth+'-'+dday;
    this.setData({ searchdate: datestr})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var app = getApp();
    var getsrc = app.globalData.src;
    this.setData({ src: getsrc });
  },
  urlChangeEvent(e) {
    const { value } = e.detail;
    this.setData({ src: value });
    var app = getApp();
    app.globalData.src=this.data.src;

  },
  clearurl() {
     this.setData({ src: null });
     var app = getApp();
     app.globalData.src = this.data.src;
  },
  playurl(){
    if (!this.data.src)
   {
      return;
   }
    if (!backgroundAudioManager.paused )
    {
      backgroundAudioManager.stop();
    }
    backgroundAudioManager.src = this.data.src;
    backgroundAudioManager.play();
  },

  searchaudiourl: function(){

  },
  searchrecord: function(){

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      searchdate: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})