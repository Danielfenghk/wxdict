const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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
 * 生成GUID序列号
 * @returns {string} GUID
 */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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
const rpxIntoPx = unit => {
  const res = wx.getSystemInfoSync();
  return unit * res.windowWidth / 750
};
/**
 * @param {Function} func 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
*/
function promiseHandle(func, options) {
  options = options || {};
  return new Promise((resolve, reject) => {
    if (typeof func !== 'function')
      reject();
    options.success = resolve;
    options.fail = reject;
    func(options);
  });
}

module.exports = {
  formatTime: formatTime,
  formatDate,
  formatTime1,
  rpxIntoPx,
  guid: guid,
  log: log,
  promiseHandle: promiseHandle,
  getDateStr: getDateStr,
  formatNumber: formatNumber
}
