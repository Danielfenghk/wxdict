// pages/songlist/songlist.js
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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