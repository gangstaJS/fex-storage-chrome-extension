function parseJSON(response) {
  return response.json()
}

export default class {
  static getObject(key = null) {
    return fetch(`http://fex.net/j_object_view/${key}`)
    .then(parseJSON);
  }
  
  static createObject(key = null) {
    return fetch(`http://fex.net/j_object_create`)
    .then(parseJSON);
  }
  
  static deleteObject(key = '') {
    return fetch(`http://fex.net/j_object_delete`)
    .then(parseJSON);
  }
}