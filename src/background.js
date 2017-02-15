import Storage from './shared/storage';
import { 
  INJECT_EV, 
  OBJECT_CREATED_EV, 
  INJECT_CODE_SNIPPET,
  FILTER_URL_OBJECT_DELETE,
  DELETE_OBJECT_REGEX 
} from './constants';

chrome.webRequest.onCompleted.addListener(function (details) {    
    let match = DELETE_OBJECT_REGEX.exec(details.url);
    
    if(match && match[1]) {
      Storage.rmObjectLocal(match[1]);
    } 
},{ urls: [FILTER_URL_OBJECT_DELETE] },["responseHeaders"]);

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    switch (msg.ev) {
      case INJECT_EV:
        chrome.tabs.query({currentWindow: true, active : true},function(tabArray) {
          if(!tabArray) return;  
          
          chrome.tabs.executeScript(tabArray[0].id, {code: INJECT_CODE_SNIPPET, runAt: 'document_end'}, Function.prototype);
        });
      break;
      case OBJECT_CREATED_EV:
        Storage.addObject(msg.data.token);
      break;
        
    }
  });
});