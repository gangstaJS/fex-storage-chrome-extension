import { OBJECT_CREATED_EV, OBJECT_CREATE_PATH } from './constants'

$(document).on('ajaxSuccess', f);

function f(event, request, settings) {
  if(settings.url == OBJECT_CREATE_PATH) {
    window.postMessage({
  		type: OBJECT_CREATED_EV,
  		data: request.responseJSON
  	}, '*');
  }  
}