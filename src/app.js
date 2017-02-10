console.log('Content page');

var port = chrome.runtime.connect();

port.postMessage({ev: 'INJECT'});

window.addEventListener('message', function(event) {
	if (event.source != window) {
		return;
	}

	if (event.data.type && (event.data.type == 'OBJECT_CREATED')) {
		port.postMessage({ev: 'OBJECT_CREATED', data: event.data.data});
	}
}, false);