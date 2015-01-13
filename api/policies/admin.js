/**
* Allow any authenticated user
*/

module.exports = function(req,res,next){

	// User is allowed, proceed to controller
	if (req.session.User && req.session.User.admin) {
		return next();
	}

	// User is not allowed
	else{
		var requireAdminError = [{name : 'requireAdminError', message : 'You must be admin.'}];

		req.session.flash = {
			err : requireAdminError
		};

		res.redirect('/session/new');
	}


};