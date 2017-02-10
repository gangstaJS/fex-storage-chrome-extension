function parseJSON(response) {
  return response.json()
}

export function addObject(token = null) {
  localStorage[token] = token;
  
  fetch('http://fex.net/j_object_view/852271992260')
  .then(parseJSON)
  .then(json => {
    delete json.upload_list;
  })
  
};

export function removeObject(token = null) {
  delete localStorage[token];
};