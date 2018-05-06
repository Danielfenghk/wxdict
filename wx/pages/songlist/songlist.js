import DataService from '../../datas/DataService';
import {
  promiseHandle, guid, log, formatNumber, formatTime1, formatTime, rpxIntoPx
} from '../../utils/util';
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    searchdate: '2016-09-01',
      // 事项列表
    dictid:'',
    audiourl: '',
    itemList: [],
    editItemList: [] //编辑勾选中的事项id
  
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
   
      
    this.setData({ searchdate: datestr,})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  loadItemListData.call(this);
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
    let { value } = e.detail;
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
    var app = getApp();
    app.globalData.src = this.data.src;
    backgroundAudioManager.src = this.data.src;
    backgroundAudioManager.play();
  },

  searchaudiourl: function(){
   
    let itemchar=[
     'http://qiniuuwmp3.changba.com/762594318.mp3',
      'https://flex.acast.com/www.scientificamerican.com/podcast/podcast.mp3?fileId=F157C08B-1B3C-4EDD-BC2FBCB1EFFCE184',    
      'https://flex.acast.com/www.scientificamerican.com/podcast/podcast.mp3?fileId=0648FCC0-1605-41B5-BCDF76B1D357E077',
      'https://flex.acast.com/www.scientificamerican.com/podcast/podcast.mp3?fileId=623C52F0-E0B4-426A-A31F3EE667E21B5A',
      'https://n1audio.hjfile.cn/tlk/fb01f9ee46b24e9b9e8143b0776bef75.mp3',
      'http://download.putclub.com/newupdate/voanews5/new170918.mp3',
      'http://k5.kekenet.com/Sound/2018/05/voacs0505_0455461hmP.mp3',
      'https://n1audio.hjfile.cn/tlk/891b78abb7fd47b8b3d6d89a03c1496d.mp3',
      'https://n1audio.hjfile.cn/tlk/9c77e6c6837e4d669ad2394898d6a7fb.mp3',
      'https://n1audio.hjfile.cn/tlk/34b2abb855bc4fd5b5c6b558603606db.mp3',
    ]
    this.setData({ src: itemchar[Math.floor(Math.random() * itemchar.length)] });
    var app = getApp();
    app.globalData.src = this.data.src;
  },
  searchrecord: function(){
    loadItemListData.call(this);
  },
  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      searchdate: e.detail.value
    })
  },
  
  delallrecord: function(){
    wx.clearStorage();
    loadItemListData.call(this);
  },

   // 事项列表项按动作事件
  listItemClickEvent(e) {
    const { dictid,year } = e.currentTarget.dataset;
    let _this = this;
  
     const itemList = ['详情', '删除'];
      promiseHandle(wx.showActionSheet, { itemList: itemList || null, itemColor: '#2E2E3B' })
        .then((res) => {
          if (!res.cancel) {
            switch (itemList[res.tapIndex]) {
              case '详情':
                console.log('../index/index?dictid=' + dictid + '&searchyear=' + year);
                wx.navigateTo({ url: '../index/index?dictid=' + dictid +'&searchyear='+year});
                break;
              case '删除':
                new DataService({ dictid: dictid,year: ''+year, }).delete().then(() => {
                  loadItemListData.call(_this);
                });
                break;
            }
          }
        }).catch(() => {
          //2017.9.9 添加取消事件处理
          //官方文档：tip: wx.showActionSheet 点击取消或蒙层时，回调 fail, errMsg 为 "showActionSheet:fail cancel"；
        });
   
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
});

  /**
 * 加载dictation列表数据
 */
function loadItemListData() {
   let { searchdate,} = this.data;
  let _this = this;
  //console.log(searchdate);
  let date=new Date(searchdate);
  let sk=date.getFullYear();
  DataService.findByDate(date,sk).then((lists) => {
    //console.log(lists);
    _this.setData({ itemList: lists || null });
  });
};