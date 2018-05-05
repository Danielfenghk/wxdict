// pages/textdiff/textdiff.js
//require('../../utils/diff_match_patch_uncompressed.js')
let wxparse = require("../../wxParse/wxParse.js")

import {
  diff_match_patch
} from '../../utils/diff_match_patch_uncompressed'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originalValue:'',
    dictValue:'',
    wxParseData:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dictValue: options.dictv,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
 
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  orgChangeEvent:function(e){
    const { value } = e.detail;
    this.setData({ originalValue: value });
 
  },
  dictChangeEvent: function (e) {
    const { value } = e.detail;
    this.setData({ dictValue: value });

  },

  textCompare: function(){
      var dmp = new diff_match_patch();
      var diff = dmp.diff_main(this.data.dictValue, this.data.originalValue);
      dmp.Diff_EditCost=4;
      dmp.Match_Distance=10;
 
    var that = this;
    var rslt = '<div>' + dmp.diff_prettyHtml(diff) + '</div>';
    wxparse.wxParse('wxParseData', 'html', rslt ,that,5);
   
   // WxParse.wxParse('originalValue', 'html', dmp.diff_prettyHtml(diff), that);
  // console.log(dmp.diff_prettyHtml(diff));
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