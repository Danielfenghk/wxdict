import DataRepository from 'DataRepository';
import { promiseHandle } from '../utils/util';

/**
 * 数据业务类
 */
class DataSerivce {

  constructor(props) {
    props = props || {};
    this.dictid = props['dictid'] ||0;
    this.content = props['content'] || '';
    this.date = props['date'] || '';
    this.month = props['month'] || '';
    this.year = props['year'] || '';
    this.title = props['title'] || '';
  }

  /**
   * 保存当前对象数据
   */
  save() {
    if (this._checkProps()) {
      return DataRepository.addData({
        title: this.title,
        content: this.content,
        year: this.year,
        month: this.month,
        date: this.date,        
        dictid:this.dictid
        },this.year);
    }
  }
  
  /**
   * update当前对象数据
   */
  update() {
    if (this._checkProps()) {
        
      return DataRepository.updateData({
         title: this.title,
        content: this.content,
        year: this.year,
        month: this.month,
        date: this.date,        
        dictid:this.dictid
      },this.year);
    }
  }
  

  /**
   * 获取所有事项数据
   */
  static findAll(key) {
    return DataRepository.findAllData(key)
      .then(data => data.data ? data.data : []);
  }

  /**
   * 通过id获取事项
   */
  static findById(id,key) {
    return DataRepository.findBy(item => item['dictid'] == id, key)
      .then(items => (items && items.length > 0) ? items[0] : null);
  }

  /**
   * 根据id删除事项数据
   */
  delete() {
    return DataRepository.removeData(this.dictid,this.year);
  }

  /**
   * 批量删除数据
   * @param {Array} ids 事项Id集合
   */
  static deleteRange(ids,key) {
    return DataRepository.removeRange(ids);
  }

  /**
   * 根据日期查找所有符合条件的事项记录
   * @param {Date} date 日期对象
   * @returns {Array} 事项集合
   */
  static findByDate(date,key) {
    if (!date) return [];
    return DataRepository.findBy(item => {
     return item && item['date'] == date.getDate() &&
        item['month'] == date.getMonth() &&
        item['year'] == date.getFullYear();
    },key).then(data => data);
  }

  _checkProps() {
    return this.title && this.date && this.year && this.month&& this.dictid;
  }
}

module.exports = DataSerivce;