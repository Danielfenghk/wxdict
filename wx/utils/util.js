const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const dday = day< 10 ? '0' + day : day;
  const dmonth  = month < 10 ? '0' + month : month;

  return [year, dmonth, dday].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDateStr(date) {
  if (!date) return '';
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}


/**
 * 记录日志
 * @param {Mixed} 记录的信息
 * @returns {Void}
 */
function log(msg) {
  if (!msg) return;
  if (getApp().settings['debug'])
    console.log(msg);
  let logs = wx.getStorageSync('logs') || [];
  logs.unshift(msg)
  wx.setStorageSync('logs', logs)
}
const formatDate = (date, format) => {
  if (format === undefined) {
    format = date;
    date = new Date();
  }
};

const formatTime1 = (time, showHour) => {
  const h = time.getUTCHours();
  const m = time.getUTCMinutes();
  const s = time.getUTCSeconds();
  if (showHour || h > 0) {
    return [h, m, s].map(formatNumber).join(':');
  } else {
    return [m, s].map(formatNumber).join(':');
  }
};

function formatTime2(time, format) {
  let temp = '0000000000' + time
  let len = format.length
  return temp.substr(-len)
};

const rpxIntoPx = unit => {
  const res = wx.getSystemInfoSync();
  return unit * res.windowWidth / 750
};

function isFunction( obj ) {
  return typeof obj === 'function';
};

module.exports = {
  formatTime: formatTime,
  formatDate,
  formatTime1,
  formatTime2,
  rpxIntoPx,
  log: log,
  isFunction: isFunction,
  getDateStr: getDateStr,
  formatNumber: formatNumber
}
