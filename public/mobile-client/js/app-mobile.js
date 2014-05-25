//var socket = io.connect('http://localhost:5000/');
var socket = io.connect('http://limitless-thicket-5434.herokuapp.com/');

var btn = document.getElementById("btn");
btn.addEventListener("mousedown", onUserInput, false);
btn.addEventListener("mouseup", onUserInput, false);
btn.addEventListener("mouseout", onUserInput, false);

//var pressNum = 0;

function onUserInput(event){
	switch(event.type){
		case 'mousedown':
			socket.emit('update_world_data', { userUID: '0000', userAction: 1 });
		break;
		
		case 'mouseup':
			socket.emit('update_world_data', { userUID: '0000', userAction: 0 });
		break;
		
		case 'mouseout':
			socket.emit('update_world_data', { userUID: '0000', userAction: 0 });
		break;
	}
	
	//pressNum++;
}