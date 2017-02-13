import LS from 'shared/ls'
import API from 'shared/api'

export default class {
  static getAll() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({ data: LS.getJson('objects') });
      }, 10);
    });
  }
  
  static addObject(token = '') {
    API.getObject(token).then(res => {
      delete res.upload_list;
      console.log(res);
      let objects = LS.getJson('objects') || {};
      objects[token] = res;
      LS.setJson('objects', objects);
    });
  }
  
  static rmObjectLocal(key = '') {
    let objects = LS.getJson('objects') || {};
    
    if(objects[key]) {
      delete objects[key];
      LS.setJson('objects', objects);
    }
  }
  
  static rmObject(key = '') {
    return new Promise((res, rej) => {
      API.deleteObject(key).then(res => {
        this.rmObjectLocal(key);
        res({status: 'ok'});
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
} 