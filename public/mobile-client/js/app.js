//var socket = io.connect('http://localhost:5000/');
var socket = io.connect('http://limitless-thicket-5434.herokuapp.com/');

var btn = document.getElementById("btn");
btn.addEventListener("mousedown", onUserInput, false);
btn.addEventListener("mouseup", onUserInput, false);
btn.addEventListener("mouseout", onUserInput, false);


function onUserInput(event){
	switch(event.type){
		case 'mousedown':
			socket.emit('add_message', { userUID: '0000', userAction: 'mouseDown' });
		break;
		
		case 'mouseup':
			socket.emit('add_message', { userUID: '0000', userAction: 'mouseUp' });
		break;
		
		case 'mouseout':
			socket.emit('add_message', { userUID: '0000', userAction: 'mouseUp' });
		break;
	}
}


socket.on('news', function (data) {
	console.log(data);
    //socket.emit('my other event', { my: 'data' });
});