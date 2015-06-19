/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

	'new' : function(req,res,next){

		res.locals.layout = 'session/session-layout';
		
		// sets time for authenticated session to expireafter 60 seconds
		// var oldDateObj = new Date();
		// var newDateObj = new Date(oldDateObj.getTime() + 60000);
		// req.session.cookie.expires = newDateObj;
		// req.session.authenticated = true;
		// console.log(req.session);
		// console.log(new Date());

		// render the view
		res.view('session/new');

	},


	create : function(req,res,next){
		// Check for email and password in params sent via the form, if none
		// redirect the browser back to the sign-in form
		if(!req.param('email') || !req.param('password')){
			// return next({err: ["Password doesn't match password confirmation"]});

			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message : 'You must enter both username and password.'}];

			// remmeber that err is the object being passed dowm (a.k.a flash.err), whose value is another object with
			// the key of usernamePasswordRequiredError
			req.session.flash = {
				err : usernamePasswordRequiredError
			};

			res.redirect('/session/new');
			return;
		}

		// Try to find the user by their email address.
		// findOneByEmail is a dynamic finder in that it searches the model by a particular attribute.
		User.findOneByEmail(req.param('email')).exec(function(err,user){
			if(err) return next(err);

			// If no user is found...
			if(!user){
				var noAccountError = [{name : 'noAccount',message : 'The email address '+ req.param('email') + ' not found.'}];
				req.session.flash = {
					err : noAccountError
				};
				res.redirect('/session/new');
				return;
			}

			// console.log(req.param('password'));
			// console.log(user);

			// compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err,valid){
				if(err) return next(err);

				// If the password from the form does not match the password from the database ...
				if(!valid){
					var usernamePasswordMissmatchError = [{name : 'usernamePasswordMismatch', message : 'Invalid username and password combination.'}];
					req.session.flash = {
						err : usernamePasswordMissmatchError
					};
					res.redirect('/session/new');
					return;
				}

				//Log user in
				req.session.authenticated = true;
				req.session.User = user;

				// // Change user status to online
				// user.online = true;

				// user.save(function(err,user){
				// 	if(err) return next(err);

				// 	console.log(user);

				// 	// Inform other sockets (e.g connected sockets are subscribed) that this user us now logged in
				// 	User.publishUpdate(user.id,{
				// 		loggedIn : true,
				// 		id : user.id
				// 	});

				// 	// If the user is also an admin redirect to the user list (e.g /views/user/index.ejs)
				// 	// This is used in conjunction with config/policies.js file
				// 	if(req.session.User.admin){
				// 		res.redirect('/user');
				// 		return;
				// 	}

				// 	//redirect to their profile page (e.g. views/user/show.ejs)
				// 	res.redirect('/user/show/'+ user.id);

				// });

				// update can be used instead of save - prefferred for multiple instances
				User.update(req.session.User.id,{
					online : true
				}, function(err,updated){
					if (err) return next(err);

					User.publishUpdate(user.id,{
						loggedIn : true,
						id : user.id
					});

					console.log(user);

					// If the user is also an admin redirect to the user list (e.g /views/user/index.ejs)
					// This is used in conjunction with config/policies.js file
					if(req.session.User.admin){
						res.redirect('/user');
						return;
					}

					//redirect to their profile page (e.g. views/user/show.ejs)
					res.redirect('/user/show/'+ user.id);

				});
				

			});

		});
	},

	destroy : function(req,res,next){

		var userId = req.session.User.id;

		User.findOne(userId, function foundUser(err,user){

			// update can be used instead of save - prefferred for multiple instances
			User.update(userId,{
				online : false
			}, function(err){
				if (err) return next(err);

				User.publishUpdate(user.id,{
					loggedIn : false,
					id : user.id
				});

				//Wipe out the session (log out)
				req.session.destroy();

				//Redirect the browser to the sign in page
				res.redirect('/session/new/');
			});


		});
		
	}

};

