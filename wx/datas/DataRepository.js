import Config from 'Config';
import { guid, log, promiseHandle } from '../utils/util';

class DataRepository {

  /**
   * 添加数据
   * @param {Object} 添加的数据
   * @returns {Promise} 
   */
  static addData(data,key) {
    if (!data) return false;
     return DataRepository.findAllData(''+key).then(allData => {
      allData = allData || [];
      console.log(allData);
      allData.unshift(data);
      wx.setStorage({ key: ''+key, data: allData });
    });
  }

  /**
   * 删除数据
   * @param {string} id 数据项idid
   * @returns {Promise}
   */
  static removeData(id,key) {
    return DataRepository.findAllData(''+key).then(data => {
      if (!data) return;
      for (let idx = 0, len = data.length; idx < len; idx++) {
        if (data[idx] && data[idx]['dictid'] == id) {
          data.splice(idx, 1);
          break;
        }
      }
      wx.setStorage({ key: ''+key, data: data });
    });
  }

  /**
   * 批量删除数据
   * @param {Array} range id集合
   * @returns {Promise}
   */
  static removeRange(range,key) {
    if (!range) return;
    return DataRepository.findAllData(''+key).then(data => {
      if (!data) return;
      let indexs = [];
      for (let rIdx = 0, rLen = range.length; rIdx < rLen; rIdx++) {
        for (let idx = 0, len = data.length; idx < len; idx++) {
          if (data[idx] && data[idx]['dictid'] == range[rIdx]) {
            indexs.push(idx);
            break;
          }
        }
      }

      let tmpIdx = 0;
      indexs.forEach(item => {
        data.splice(item - tmpIdx, 1);
        tmpIdx++;
      });
      wx.setStorage({ key: ''+key, data: data });
    });

  }

  /**
   * 更新数据
   * @param {Object} data 数据
   * @returns {Promise} 
   */
  static updateData(data,key) {
    if (!data || !data['dictid']) return false;
    return DataRepository.findAllData(''+key).then(allData => {
      if (!allData) return false;
      for (let idx = 0, len = allData.length; idx < len; idx++) {
        if (allData[idx] && allData[idx]['dictid'] == data['dictid']) {
          allData[idx] = data;
          break;
        }
      }
      wx.setStorage({ key: '' + key, data: allData });
    });

  }

  /**
   * 获取所有数据
   * @returns {Promise} Promise实例
   */
  static findAllData(key) {
    return promiseHandle(wx.getStorage, { key: ''+key }).then(res => res.data ? res.data : []).catch(ex => {
      log(ex);
    });
  }

  /**
   * 查找数据
   * @param {Function} 回调
   * @returns {Promise} Promise实例
   */
  static findBy(predicate,key) {
    return DataRepository.findAllData(''+key).then(data => {
      if (data) {
        data = data.filter(item => predicate(item));
      }
      return data;
    });
  }
}

module.exports = DataRepository;