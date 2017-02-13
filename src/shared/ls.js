export default class {
  static isSupported() {
    return localStorage && typeof localStorage === 'object';
  }
  
  static getJson(key = '') {
    let result = null;
    
    if(this.isSupported()) {
      let data = localStorage.getItem(key);
      
      try {
        result = JSON.parse(data);
      } catch(e) {
        console.warn('Cannot parse JSON by key %s [%s]', key, e.message);
      }
    } 
    
    return result;
  }
  
  static setJson(key = '', value = {}) {
    if(this.isSupported()) {
      let result = JSON.stringify(value);    
      localStorage.setItem(key, result);
    } 
  }
  
  static clearAll() {
    // TODO:
  }
}