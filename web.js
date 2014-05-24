var express = require('express'),
    app,
    server;

app = express();
server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));

var port = Number(process.env.PORT || 5000);
var io = require('socket.io').listen(port);
var mongoClient = require('mongodb').MongoClient;

io.sockets.on('connection', function(socket) {
	
	console.log('onConnection');
	
	socket.emit('news', {
		hello : 'world'
	});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});

mongoClient.connect('mongodb://heroku_app25601055:9q4lt9502mvcp0ebuu3run97ae@ds053218.mongolab.com:53218/heroku_app25601055/user_worldData', function(err, db) {
	initCollection(db);
});

function initCollection(db) {
	db.collectionNames('messages_collection', function(err, names) {
		var collection;

		if (names.length === 1) {
			collection = db.collection('messages_collection');

			verifyCollection(db, collection);
		} else {
			db.createCollection('messages_collection', {
				capped : true,
				size : 102400
			}, function(err, collection) {
				console.log('Created collection');

				verifyCollection(db, collection);
			});
		}
	});
}

function initSockets(collection) {
	io.sockets.on('connection', function(socket) {
		var stream = collection.find({}, {
			tailable : 1,
			awaitdata : true,
			numberOfRetries : -1
		}).sort({
			$natural : -1
		}).stream();

		stream.on('data', function(data) {
			socket.emit('messages', data);
		});

		socket.on('add_message', function(data) {
			collection.insert(data, function(err) {
				console.log('Wrote', data);
			});
		});
	});
}

function verifyCollection(db, collection) {
	collection.isCapped(function(err, capped) {
		if (capped) {
			initSockets(collection);
		} else {
			console.log('Not a capped collection');

			db.dropCollection('messages_collection', function(err) {
				console.log('Dropped collection');

				initCollection(db);
			});
		}
	});
}