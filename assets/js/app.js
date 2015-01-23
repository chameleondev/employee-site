$(document).ready(function(){

	// // as soon as this file is loaded connect automatically
	var socket = io.connect();

	io.socket.on('connect',function socketConnected(){

		console.log("This is from the connect: "+ this.socket.sessionid);

		//listen for Comet messages from sails
		socket.on('user', function messageRecieved(message){
			console.log('New Comet message recieved ::',message);

			// route this message to the appreopriate place
			var userId = message.id;
			updateUserInDom(userId, message);
		});

		//subscribe to the user model classroom and instance room
		socket.get('/user/subscribe');

	});

	// //subscribe to the user model classroom and instance room
	// io.socket.get('/user/subscribe');
	
	// //listen for Comet messages from sails
	// io.socket.on('user', function messageRecieved(message){
	// console.log('New Comet message recieved :: '+message);
	// });



	var updateUserInDom = function(userId,message){

		//What page am i on?
		var page = document.location.pathname;

		//Strip trailing slash if we've got one
		page = page.replace(/(\/)$/, '');

		// Route to the appropriate user update handler based on which page you're on
		switch(page){

			case '/user':

			if (message.verb === 'updated') {
				UserIndexPage.updateUser(userId, message);
			}

			if (message.verb === 'create') {
				UserIndexPage.addUser(message);
			}

			if (message.verb === 'destroy') {
				UserIndexPage.destroyUser(userId);
			}

			break;

		}
	};

	var UserIndexPage = {

		updateUser : function(id, message){

			var $userRow = $('tr[data-id="'+ id +'"] td img').first();

			if(message.data.loggedIn) {
				$userRow.attr('src', "/images/online.png");
			} else {
				$userRow.attr('src', "/images/offline.png");
			}
		},

		addUser : function(user){

			// obj is going to encompass both new user data as well as the _csrf info from
			// the layout.ejs file
			var obj = {
				user : user.data,
				_csrf: window.overlord.csrf || ''
			};

			// Add the templare to the bottom of the admistration Page
			$('tr: last').after(
				//This is the path to the template file
				JST['assets/linker/templates/addUser.ejs'](obj)
			);

		}
		

	};
});