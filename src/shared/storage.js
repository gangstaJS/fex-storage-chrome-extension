import LS from 'shared/ls'
import API from 'shared/api'
import { KEY_STORAGE, URL_WITH_HASH } from 'constants'

export default class {
  static getAll() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({ data: LS.getJson(KEY_STORAGE) });
      }, 1500);
    });
  }
  
  static addObject(token = '') {
    return API.getObject(token).then(res => {
      delete res.upload_list;
      let objects = LS.getJson(KEY_STORAGE) || {};
      objects[token] = res;
      LS.setJson(KEY_STORAGE, objects);
      return res;
    });
  }
  
  static rmObjectLocal(key = '') {
    let objects = LS.getJson(KEY_STORAGE) || {};
    
    if(objects[key]) {
      delete objects[key];
      LS.setJson(KEY_STORAGE, objects);
    }
  }
  
  static rmObject(key = '') {
    return new Promise((res, rej) => {
      API.deleteObject(key).then(() => {
        this.rmObjectLocal(key);
        res({status: 'ok'});
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  static newObject() {
    return new Promise((res, rej) => {
      API.createObject()
      .then(response => {
        this.addObject(response.token).then(() => {
          res({url: URL_WITH_HASH+response.token});
        })
      });
    });
  }
} 