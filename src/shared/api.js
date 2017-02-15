import { J_OBJECT_VIEW, J_OBJECT_CREATE, J_OBJECT_DELETE } from 'constants'

function parseJSON(response) {
  return response.json()
}

export default class {
  static getObject(key = null) {
    return fetch(J_OBJECT_VIEW+key)
    .then(parseJSON);
  }
  
  static createObject() {
    return fetch(J_OBJECT_CREATE)
    .then(parseJSON)
  }
  
  static deleteObject(key = '') {
    return fetch(J_OBJECT_DELETE+key)
    .then(parseJSON);
  }
}