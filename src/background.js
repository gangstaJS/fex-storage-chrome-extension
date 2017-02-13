import Storage from './shared/storage';


chrome.webRequest.onCompleted.addListener(function (details) {    
    let match = /^http:\/\/fex\.net\/j_object_delete\/(\d+)\/?$/i.exec(details.url);
    
    if(match && match[1]) {
      Storage.rmObjectLocal(match[1]);
    } 

},{
    urls: ["http://fex.net/j_object_delete/*"]
},["responseHeaders"]);

const actualCode = `
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('/dist/injected.build.js')
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
`;

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    switch (msg.ev) {
      case 'INJECT':
      chrome.tabs.query({currentWindow: true, active : true},
            function(tabArray) {
              if(!tabArray) return;
              
              chrome.tabs.executeScript(tabArray[0].id, {code: actualCode, runAt: 'document_end'}, function() {});
            });
        break;
        case 'OBJECT_CREATED':
          Storage.addObject(msg.data.token);
          break;
      default:
      break;
        
    }
  });
});