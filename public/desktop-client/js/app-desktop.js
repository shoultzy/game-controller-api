//var socket = io.connect('http://localhost:5000/');
var socket = io.connect('http://limitless-thicket-5434.herokuapp.com/');

var userAction = 0;

socket.on('on_receive_world_data', function (data) {
	//console.log('dataReceived');
	//console.log(data);
	userAction = data.userAction;
});

setInterval(receiveWorldData, 100);

function receiveWorldData(){
	//console.log('sendRequest');
	socket.emit('on_request_world_data', '0000');
}