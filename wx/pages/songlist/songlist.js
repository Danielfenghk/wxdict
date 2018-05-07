import {
  isFunction
} from '../../utils/util';
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    audiourl: '',
    searchresult: [
      'http://qiniuuwmp3.changba.com/762594318.mp3',
      'https://flex.acast.com/www.scientificamerican.com/podcast/podcast.mp3?fileId=F157C08B-1B3C-4EDD-BC2FBCB1EFFCE184',
      'https://flex.acast.com/www.scientificamerican.com/podcast/podcast.mp3?fileId=0648FCC0-1605-41B5-BCDF76B1D357E077',
      'https://flex.acast.com/www.scientificamerican.com/podcast/podcast.mp3?fileId=623C52F0-E0B4-426A-A31F3EE667E21B5A',
      'https://n1audio.hjfile.cn/tlk/fb01f9ee46b24e9b9e8143b0776bef75.mp3',
      'http://download.putclub.com/newupdate/voanews5/new170918.mp3',
      'http://k5.kekenet.com/Sound/2018/05/voacs0505_0455461hmP.mp3',
      'https://n1audio.hjfile.cn/tlk/891b78abb7fd47b8b3d6d89a03c1496d.mp3',
      'https://n1audio.hjfile.cn/tlk/9c77e6c6837e4d669ad2394898d6a7fb.mp3',
      'https://n1audio.hjfile.cn/tlk/34b2abb855bc4fd5b5c6b558603606db.mp3',],
    item:'',
   
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
  
  weburlChangeEvent(e){
    let { value } = e.detail;
    this.setData({ audiourl: value });
  },
 

  searchaudiourl: function(){
      var _this = this;
     // let searchword=this.data.audiourl;
      if (false) {  
          request (searchword,'', (data) => {
            let resultaudio=searchaudio(data);
            if (resultaudio.length>0) {      
              _this.setData({ searchresult: resultaudio||null});
              
            } else {
             _this.setData({ audiourl: ''});
            }
          }, () => {
            _this.setData({ audiourl: ''});
          }, () => {
            _this.setData({ audiourl: ''});
          });
    
      }else{
        let itemchar = this.data.searchresult;
            this.setData({ src: itemchar[Math.floor(Math.random() * itemchar.length)] });
            var app = getApp();
            app.globalData.src = this.data.src;
      }
  },
 
   // 事项列表项按动作事件
  listItemClickEvent(e) {
    const { src } = e.currentTarget.dataset;
    console.log(src);
    this.setData({ src: src, audiourl:src});
      var app = getApp();
      app.globalData.src = src;
      backgroundAudioManager.src = src;
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
});


function searchaudio (data){
    
    var urlRegex = /https?:\/\/[a-zA-Z0-9./?=_-]+(\.mp3|\.m4a|\.aac|\.wav)[a-zA-Z0-9./?=_-]*/img;
   // let text= eval('`'+data+'`');
    let text=`${data}`;
    let list=text.match(urlRegex)||[];
    list = list.filter(function (x, i, a) { 
         return a.indexOf(x) == i; 
    });
    return list;
};


/**
 * 网路请求
 */
function request(url, data, successCb, errorCb, completeCb) {
    wx.request({
        url: url,
        method: 'GET',
        header: {
           'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success: function(res) {
            if (res.statusCode == 200) {
                isFunction(successCb) && successCb(res.data);
            }else
               console.log('请求异常', res);
        },
        error: function() {
            isFunction(errorCb) && errorCb();
        },
        complete: function() {
            isFunction(completeCb) && completeCb();
        }
    });
};