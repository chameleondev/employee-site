/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'new' : function(req,res){
		// console.log(req.session);

		
		// render the view
		res.view();

		
	},

	create : function(req,res,next){


		// so that admin can not be passed into the form by editing the dom
		var userObject = {
			name : req.param('name'),
			title : req.param('title'),
			email : req.param('email'),
			password : req.param('password'),
			confirmation : req.param('confirmation'),
		};
		

		// Create a User with the params sent from
		// the sign-up form --> new.ejs
		User.create(userObject,function userCreated(err,user){

			//If there's an error
			// if(err) return next(err);

			if (err) {
				console.log(err);

				// create flash object inside the session which holds the errors
				req.session.flash = {
					err : err.ValidationError
				};

				// if error redirect back to sign up page
				return res.redirect('/user/new');
			}

			// After successfully creating the user
			// redirect to the show action
			// res.json(user);

			//Log user in
			req.session.authenticated = true;
			req.session.User = user;

			// Change user status to online
			user.online = true;
			user.save(function(err,user){
				if(err) return next(err);

				User.publishCreate(user)

				res.redirect('/user/show/'+user.id);

			});

		});
	},

	show : function(req,res,next){
		// use findOne method on the model
		User.findOne(req.param('id'), function foundUser(err, user){
			// if theres an error use the next method with the error
			if(err) return next(err);
			// if user is not created use next
			if(!user) return next();

			// render the view passing in the user if user exists
			res.view({
				user : user
			});
		});

	},

	index : function(req,res,next){

		// get an array of all users in the User collection(e.g table)
		User.find(function foundUsers(err, users){
			
			if(err) return next(err);

			//pass array down to the /views/index.ejs page
			res.view({
				users : users
			});

		});

	},

	// render the edit view (e.g /views/edit.ejs)
	edit : function(req,res,next){
		// find the user from the id passed in via the params
		User.findOne(req.param('id'), function foundUser(err, user){
			
			if(err) return next(err);
			if(!user) return next();

			res.view({
				user : user
			});

		});

	},

	// process  the info from edit view
	update : function(req,res,next){

		if (req.session.User.admin) {
			var userObject = {
				name : req.param('name'),
				title : req.param('title'),
				email : req.param('email'),
				admin : req.param('admin')
			};
		} else{
			var userObject = {
				name : req.param('name'),
				title : req.param('title'),
				email : req.param('email')
			};
		}



		User.update(req.param('id'),userObject,function userUpdated(err){
			
			if(err){
				return res.redirect('/user/show/' + req.param('id'));
			}

			res.redirect('user/show/'+ req.param('id'));

		});

	},

	destroy : function(req,res,next){

		User.findOne(req.param('id'), function foundUser(err,user){

			if(err) return next(err);
			if(!user) return next('User doesn\'t exist.');

			User.destroy(req.param('id'),function userDestroyed(err){
				if(err) return next(err);

				User.publishCreate(user.id);

				res.redirect('/user');
			});

			

		});

	},

	subscribe : function(req,res){

		// if (req.isSocket) {
		// 	User.watch(req);
		// 	console.log(sails.sockets.id(req));
		// };

		User.find(function foundUsers(err,users){

			// console.log(users);

			// subscribe to user models class room
			// User.subscribe(req.socket);
			User.watch(req.socket);

			// subscribe to user models instance room
			User.subscribe(req.socket,users);

			res.send(200);

		});

		

	}

};

