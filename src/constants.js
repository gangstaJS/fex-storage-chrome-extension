export const KEY_STORAGE = 'objects'
export const INJECT_EV = 'INJECT'
export const OBJECT_CREATED_EV = 'OBJECT_CREATED'

export const INJECT_CODE_SNIPPET = `
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('/injected.build.js')
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
`;

export const FILTER_URL_OBJECT_DELETE = 'http://fex.net/j_object_delete/*';
export const DELETE_OBJECT_REGEX = /^http:\/\/fex\.net\/j_object_delete\/(\d+)\/?$/i;
export const OBJECT_CREATE_PATH = '/j_object_create';

// API urls
export const J_OBJECT_VIEW = 'http://fex.net/j_object_view/'
export const J_OBJECT_CREATE = 'http://fex.net/j_object_create'
export const J_OBJECT_DELETE = 'http://fex.net/j_object_delete/'

export const URL_WITH_HASH = 'http://fex.net/#!'