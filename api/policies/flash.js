module.exports = function(req,res,next){

	res.locals.flash = {};

	if (!req.session.flash) return next();

	// assign the flash object inside locals which is available to the view 
	// before the view is rendered
	// clone is used so that it is not a reference to the session, if the session object
	// changes we do not want locals.flash to change
	res.locals.flash = _.clone(req.session.flash);


	// set the session flash object to empty after the view is rendered
	req.session.flash = {};

	next();

};