$(document).ready(function(){

	// // as soon as this file is loaded connect automatically
	var socket = io.connect();

	io.socket.on('connect',function socketConnected(){

		console.log("This is from the connect: "+ this.socket.sessionid);

		//listen for Comet messages from sails
		socket.on('user', function messageRecieved(message){
			console.log('New Comet message recieved ::',message);
		});

		//subscribe to the user model classroom and instance room
		socket.get('/user/subscribe');

	});

	// //subscribe to the user model classroom and instance room
	// io.socket.get('/user/subscribe');
	
	// //listen for Comet messages from sails
	// io.socket.on('user', function messageRecieved(message){
	// 	console.log('New Comet message recieved :: '+message);
	// });




});