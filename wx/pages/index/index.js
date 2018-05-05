import DataService from '../../datas/DataService';
import {
  promiseHandle, guid, log, formatNumber, formatTime1, formatTime,rpxIntoPx
} from '../../utils/util';
const backgroundAudioManager = wx.getBackgroundAudioManager();

Page({
  data: {
    showMonth: {},
    selectDateText: '',
    pickerDateValue: '',
    todoInputValue: '',
    todoTextAreaValue: '',
    saveMsg:'',
    dictid: '',
    searchyear: '',
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: '',

    title: '此时此刻',
    epname: '此时此刻',
    singer: '许巍',
    coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    currentTime: '00:00',
    duration: '00:00',
    bp1: 0,
    bp2: 99999,
    progressWidth: 0,
    playing: false,
    waiting: true,
    drag: false,
    pauseResume: '继续',
    resumePause: '暂停',
    playStop: '播放',
    stopPlay: '停止',
        
  },

  onShow(options) {
    var app = getApp();
    var getsrc = app.globalData.src;
   
     this.setData({
      src: getsrc,
     }); 
     
  

    if (!backgroundAudioManager.paused || this.data.playing) {
      this.setData({ playing: true });
    }
    else {
      this.setData({ playing: false });
    }
  },

  onLoad(options) {
    const that = this;
    var app = getApp();
    var getsrc = app.globalData.src;
    that.setData({ src: getsrc });
    if (options.dictid && options.searchyear){
    that.setData({
      dictid: options.dictid,
      searchyear:options.searchyear,
    })
    }
    // 音频播放进度控制
    backgroundAudioManager.onTimeUpdate(() => {
      that.duration = backgroundAudioManager.duration * 1000;
      that.currentTime = backgroundAudioManager.currentTime * 1000;

      const { duration, currentTime, progressWidth } = this.setProgress(that.duration, that.currentTime);
      if (that.data.drag) {
        that.setData({
          currentTime,
          waiting: false
        });
        return;
      }
      that.setData({
        duration,
        currentTime,
        progressWidth,
        waiting: false,
        dictid: options.dictid, 
        searchyear:options.searchyear,
      });

      if (backgroundAudioManager.currentTime >= this.data.bp2) {
    
        backgroundAudioManager.pause();
        this.setData({ playing: false });
      }
    });

  },

  onReady() {
   
    const {dictid, searchyear}=this.data;
      if (dictid && searchyear){
          loadItemListID.call(this);
      }
  },

  /**
   * 设置进度函数
   * @param duration
   * @param currentTime
   * @returns {{duration: *, currentTime: *, progressWidth: string}}
   */
  setProgress(duration, currentTime) {
    return {
      duration: formatTime1(new Date(duration)),
      currentTime: formatTime1(new Date(currentTime)),
      progressWidth: parseFloat(currentTime / duration * 100).toFixed(2)
    };
  },

  /**
   * 拖拽开始，记录当前拖拽的pageX
   * @param e
   */
  touchStartProgress(e) {
    this.setData({ drag: true });
    this.touchStart = e.changedTouches[0].pageX;
    this.progress = parseInt(this.data.progressWidth * rpxIntoPx(500) / 100);
  },
  /**
   * 拖拽中，记录当前的pageX，并且与开始拖拽的点以及播放的当前进度条长度进行计算，得出拖拽的长度，重设播放进度条
   * @param e
   */
  touchMoveProgress(e) {
    let spacing = this.progress + e.changedTouches[0].pageX - this.touchStart;
    if (spacing >= rpxIntoPx(500)) {
      spacing = rpxIntoPx(500);
    } else if (spacing <= 0) {
      spacing = 0;
    }
    const progressWidth = parseFloat(spacing / rpxIntoPx(500) * 100).toFixed(2);
    this.setData({
      progressWidth
    });
  },
  /**
   * 拖拽结束后，记录当前的pageX，并且与开始拖拽的点以及播放的当前进度条长度进行计算，得出拖拽的长度，重设播放进度条
   * @param e
   */
  touchEndProgress(e) {
    let spacing = this.progress + e.changedTouches[0].pageX - this.touchStart;
    if (spacing >= rpxIntoPx(500)) {
      spacing = rpxIntoPx(500);
    } else if (spacing <= 0) {
      spacing = 0;
    }
    const progressWidth = parseFloat(spacing / rpxIntoPx(500) * 100).toFixed(2);
    this.setData({
      progressWidth,
      drag: false
    });
   
    this.currentTime = progressWidth * this.duration / 100 || 0;
    console.log(this.currentTime);
    backgroundAudioManager.seek(this.currentTime / 1000);
  },
  /**
   * 改变播放状态
   */
  changePlayerStatus() {
    this.setData({
      playing: !this.data.playing
    });
    if (this.data.playing) {
      backgroundAudioManager.play();
    } else {
      backgroundAudioManager.pause();
    }
  },

  selectaudio: function () {
    wx.navigateTo({ url: '../songlist/songlist' });
  },

  textCmp: function(){
    wx.navigateTo({ url: '../textdiff/textdiff?dictv=' + this.data.todoTextAreaValue });
  },

  audioPlay: function () {
    if (this.data.playing) {
      backgroundAudioManager.stop();
      this.setData({
        playing: false,
        currentTime: '00:00'
      });

    }
    else {
      if (this.data.src == null) {
        this.setData({
          playing: false,
          currentTime: '00:00'
        });
        return;
      }
      backgroundAudioManager.src = this.data.src;
      backgroundAudioManager.play();
      this.setData({
        playing: true
      });

      this.data.duration = backgroundAudioManager.duration * 1000 || 0;
    }

  },
  audioPause: function () {
    if (this.data.playing) {
      backgroundAudioManager.pause();
      this.setData({ playing: false });
    }
    else {
      
      backgroundAudioManager.src = this.data.src;
     let timeInMilliseconds = (Number(this.data.currentTime.split(':')[0]) * 60 + Number(this.data.currentTime.split(':')[1])) * 1000
     
     wx.seekBackgroundAudio({
       position: timeInMilliseconds/1000,
       success: function () {
         backgroundAudioManager.seek(timeInMilliseconds/1000);
       },
       fail: function () {
         backgroundAudioManager.seek(timeInMilliseconds/1000);
       },

     })

      this.setData({
        playing: true
      });

    }
    this.duration = backgroundAudioManager.duration * 1000 || 0;
  },

  audioBP1: function () {
    this.setData({ bp1:backgroundAudioManager.currentTime });
    console.log(this.data.bp1);
  },
  audioBP2: function () {
    this.setData({ bp2: backgroundAudioManager.currentTime });
    console.log(this.data.bp2);
  },

  audioRepeat: function () {
    if (this.data.src == null) {
      return;
    }
    if (this.data.bp1 >= this.data.bp2)
    {
      this.setData({ bp1: 0, bp2: 99999 });
      return;
    }
    const that = this;
  backgroundAudioManager.src=that.data.src;
  wx.seekBackgroundAudio({
      position: that.data.bp1,
      success: function () { 
          backgroundAudioManager.seek(that.data.bp1);},
      fail: function(){
        backgroundAudioManager.seek(that.data.bp1);
        },
      });

    this.setData({
      playing: true
    });


  },

  clearRepeat: function () {
    this.setData({ bp1: 0, bp2: 99999 });
  },
  audioStart: function () {
    backgroundAudioManager.seek(0)
  },
  //slider
  sliderChange: function (slider) {
    this.audio14(slider.detail.value);
  },

    showUpdatePanelEvent() {
    showUpdatePanel.call(this);
  },

  
  // 事项标题文本框变化事件
  todoInputChangeEvent(e) {
    const { value } = e.detail;
    this.setData({ todoInputValue: value });
  },


  //事项内容多行文本域变化事件
  todoTextAreaChangeEvent(e) {
    const { value } = e.detail;
    this.setData({ todoTextAreaValue: value });
  },


  // 保存事项数据
  saveDataEvent() {
    let date = new Date();
    let day = date.getDate(); //当月的天
    let month = date.getMonth() + 1; //月份，从0开始
    let year = date.getFullYear(); //年份

    let dictdate= formatTime(date);
    let { todoInputValue, todoTextAreaValue,dictid } = this.data;
     console.log(todoInputValue);
    
    if (todoInputValue == '') {
		return;
	}
      if (dictid){
        console.log(todoTextAreaValue);
        console.log('id: '+dictid);
        
            let promise = new DataService({
            title: todoInputValue,
            content: todoTextAreaValue,
            year: year,
            month: month,
            date:day,
            dictid:dictid,
          }).update();            
        } else{  
        console.log(todoTextAreaValue);
        dictid = guid();  
        console.log(dictid);
        this.setData({ dictid: dictid });
            let promise = new DataService({
            title: todoInputValue,
            content: todoTextAreaValue,
            year: year,
            month: month,
            date: day,
            dictid:dictid,
          }).save();
        };
      this.setData({ saveMsg: ' Successfully saved at:'+ dictdate});
    
  },

  resetEvent(){
    this.setData({
      todoTextAreaValue: '',
      todoInputValue: '',
      saveMsg:'',
      dictid:'',
    });
     this.setData({
      todoTextAreaValue: '',
      todoInputValue: '',
      saveMsg:'',
      dictid:'',
    });    
  },

});

 /**
 * 加载dictation列表数据
 */
function loadItemListID() {
  let { searchyear, dictid} = this.data;
  let _this = this;
  console.log('dictid=' + dictid + '&searchyear=' + searchyear);
  DataService.findById(dictid,searchyear).then((lists) => {
    //console.log(lists);
    _this.setData({ todoInputValue: lists.title || '', todoTextAreaValue:lists.content || '' });
  });
};

