import { INJECT_EV, OBJECT_CREATED_EV } from './constants'

let port = chrome.runtime.connect();

port.postMessage({ev: INJECT_EV});

window.addEventListener('message', function(event) {
	if (event.source != window) {
		return;
	}

	if (event.data.type && (event.data.type == OBJECT_CREATED_EV)) {
		try {
			port.postMessage({ev: OBJECT_CREATED_EV, data: event.data.data})
		} catch(e) {
			console.log(e.message);
			window.location.reload();
		}
	}
}, false);