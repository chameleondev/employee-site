/**
 * Work-requestController
 *
 * @description :: Server-side logic for managing work-requests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var mandrill = require('node-mandrill')('JtgzSVSSdHsYMMWmwY0IEQ');

module.exports = {

	index : function(req,res,next){

		res.locals.layout = 'work-request-layout';

		res.view();
	},

	create : function(req,res,next){

		var msg = '<b>Type of job</b>: '+req.param('jobCode')+'<br/>';

		if(req.param('client')) msg+= '<b>Client:</b> '+req.param('client')+'<br/>';
		if(req.param('product')) msg+= '<b>Product:</b> '+req.param('product')+'<br/>';
		if(req.param('projectTitle')) msg+= '<b>Project Title:</b> '+req.param('projectTitle')+'<br/>';
		if(req.param('accountPersonFname')) msg+= '<b>Account Person:</b> '+req.param('accountPersonFname')+'<br/>';
		if(req.param('budget')) msg+= '<b>Budget:</b> '+req.param('budget')+'<br/>';

		msg+= '<b>Type Of Project:</b> ';
		if(req.param('desProj')) msg+= req.param('desProj')+' | ';
		if(req.param('digProj')) msg+= req.param('digProj')+' | ';
		if(req.param('typeProj')) msg+= req.param('typeProj')+' | ';
		msg+='<br/>';

		if(req.param('taskDesc')) msg+= '<b>Task Description:</b> '+req.param('taskDesc')+'<br/>';

		msg+= '<b>Hours For Task:</b> ';
		if(req.param('needEstHours')) {
			msg+= req.param('needEstHours')+'<br/>';
		} else {
			if(req.param('desHours')) msg+='Des - '+req.param('desHours')+' | ';
			if(req.param('sdesHours')) msg+='sDes - '+req.param('sdesHours')+' | ';
			if(req.param('studioHours')) msg+='Studio - '+req.param('studioHours')+' | ';
			if(req.param('cdHours')) msg+='CD - '+req.param('cdHours')+' | ';
			if(req.param('gdHours')) msg+='GD - '+req.param('gdHours')+' | ';
		}
		msg+='<br/>';

		msg+= '<b>How Will The Work Be Used Or Presented:</b> ';
		if(req.param('pitch')) msg+= req.param('pitch')+' | ';
		if(req.param('rfp')) msg+= req.param('rfp')+' | ';
		if(req.param('creativeTheme')) msg+= req.param('creativeTheme')+' | ';
		if(req.param('ppt')) msg+= req.param('ppt')+' | ';
		if(req.param('pdf')) msg+= req.param('pdf')+' | ';
		if(req.param('digitalTool')) msg+= req.param('digitalTool')+' | ';
		if(req.param('presentedOther')) msg+= req.param('presentedOther')+' | ';
		msg+='<br/>';

		msg+= '<b>Branding:</b> ';
		if(req.param('branded')) msg+= req.param('branded')+' | ';
		if(req.param('unbranded')) msg+= req.param('unbranded')+' | ';
		if(req.param('softBranded')) msg+= req.param('softBranded')+' | ';
		if(req.param('brandedOther')) msg+= req.param('brandedOther')+' | ';
		msg+='<br/>';

		if(req.param('logosIncluded')) msg+= '<b>Logos To Be Included:</b> '+req.param('logosIncluded')+'<br/>';
		if(req.param('lookAndFeel')) msg+= '<b>Visual style,look and feel, branding specifications:</b> '+req.param('lookAndFeel')+'<br/>';
		if(req.param('scientificBackground')) msg+= '<b>Scientific Background:</b> '+req.param('scientificBackground')+'<br/>';

		if (req.param('extensions')) {
			msg+= '<b>Extensions:</b> ';
			for (var i = 0; i < req.param('extensions').length; i++) {
				msg+= req.param('extensions')[i]+' | ';
			}
			msg+='<br/>';
		}

		if (req.param('dimensions')) {
			msg+= '<b>Dimensions:</b> ';
			for (var i = 0; i < req.param('dimensions').length; i++) {
				msg+= req.param('dimensions')[i]+' | ';
			}
			msg+='<br/>';
		}

		if (req.param('orientations')) {
			msg+= '<b>Orientations:</b> ';
			for (var i = 0; i < req.param('orientations').length; i++) {
				msg+= req.param('orientations')[i]+' | ';
			}
			msg+='<br/>';
		}

		if(req.param('pages')) msg+= '<b>Pages:</b> '+req.param('pages')+'<br/>';
		if(req.param('firstDraftBy') || req.param('firstDraftByTime')) msg+= '<b>First draft by:</b> '+req.param('firstDraftBy')+' '+ req.param('firstDraftByTime')+'<br/>';
		if(req.param('finalDeliveryDate') || req.param('finalDeliveryDateTime')) msg+= '<b>Final delivery date:</b> '+req.param('finalDeliveryDate')+' '+ req.param('finalDeliveryDateTime')+'<br/>';
		if(req.param('asap')) msg+= 'ASAP <br />';



		mandrill('/messages/send', {
			message: {
				to: [{
					name: 'Michaela Hyndman',
					email: 'michaela.hyndman@chameleon-uk.com'
				},{
					name: 'Dillon Lee',
					email: 'dillon.lee@chameleon-uk.com',
					type: 'bcc'
				}],
				from_name: 'Request Form',
				from_email: 'admin@chameleon-web.com',
				html: msg,
				subject: 'New job No: '+ req.param('jobCode'),
				text: "text fallback goes here-- in case some recipients (let\'s say the Chipettes)  can\'t receive HTML emails",
				attachments : req.param('encodedUploads')
			}
		}, function(error, response){
			//uh oh, there was an error
			if (error) {
				console.log( JSON.stringify(error) );
				res.send(error);
				return;
			}

			//everything's good, lets see what mandrill said
			else{
				console.log(response);
				res.send(response);
				return;
			}
		});

	}


	
};

