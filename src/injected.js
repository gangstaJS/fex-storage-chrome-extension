$(document).on('ajaxSuccess', f);

function f(event, request, settings) {
  if(settings.url = '/j_object_create') {
    window.postMessage({
  		type: 'OBJECT_CREATED',
  		data: request.responseJSON
  	}, '*');
  }  
}