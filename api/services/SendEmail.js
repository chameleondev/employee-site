// Sends email with mandrill service

module.exports = {
	
	send : function(req,res){

		var mandrill = require('node-mandrill')('JtgzSVSSdHsYMMWmwY0IEQ');
		
		var msg = '<b>Job Code</b>: '+req.param('jobCode')+'<br/>';

		if(req.param('jobType')) msg+= '<b>Job Type:</b> '+req.param('jobType')+'<br/>';
		if(req.param('client')) msg+= '<b>Client:</b> '+req.param('client')+'<br/>';
		if(req.param('product')) msg+= '<b>Product:</b> '+req.param('product')+'<br/>';
		if(req.param('projectTitle')) msg+= '<b>Project Title:</b> '+req.param('projectTitle')+'<br/>';
		if(req.param('accountPersonFname')) msg+= '<b>Account Person:</b> '+req.param('accountPersonFname')+'<br/>';
		if(req.param('formUser')) msg+= '<b>Form Submitted by:</b> '+req.param('formUser')+'<br/>';
		if(req.param('office')) msg+= '<b>Office:</b> '+req.param('office')+'<br/>';
		if(req.param('generalDesc')) msg+= '<b>General Description:</b> '+req.param('generalDesc')+'<br/>';
		if(req.param('budget')) msg+= '<b>Budget:</b> '+req.param('budget')+'<br/>';

		msg+= '<b>Type Of Project:</b> ';
		if(req.param('desProj') ==='Design Project') msg+= req.param('desProj')+' | ';
		if(req.param('digProj') ==='Digital Project') msg+= req.param('digProj')+' | ';
		if(req.param('typeProj') ==='Typesetting Project') msg+= req.param('typeProj')+' | ';
		msg+='<br/>';

		if(req.param('taskDesc')) msg+= '<b>Task Description:</b> '+req.param('taskDesc')+'<br/>';
		if(req.param('multiplePieces') ==='Multiple Pieces') msg+= '<b>Pieces:</b> '+req.param('multiplePieces')+'<br/>';
		if(req.param('explainPiece')) msg+= '<b>Explain Piece:</b> '+req.param('explainPiece')+'<br/>';

		msg+= '<b>Hours For Task:</b> ';
		if(req.param('needEstHours')==='Need an estimate') {
			msg+= req.param('needEstHours')+'<br/>';
		} else {
			if(req.param('desHours')) msg+='Des : '+req.param('desHours')+' | ';
			if(req.param('sdesHours')) msg+='sDes : '+req.param('sdesHours')+' | ';
			if(req.param('studioHours')) msg+='Studio : '+req.param('studioHours')+' | ';
			if(req.param('cdHours')) msg+='CD : '+req.param('cdHours')+' | ';
			if(req.param('gdHours')) msg+='GD : '+req.param('gdHours')+' | ';
			if(req.param('digDes')) msg+='Digital Des : '+req.param('digDes')+' | ';
			if(req.param('desDir')) msg+='Design Dir : '+req.param('desDir')+' | ';
		}
		msg+='<br/>';

		msg+= '<b>Type Of Work:</b> ';
		if(req.param('mockup')==='Mockup') msg+= req.param('mockup')+' | ';
		if(req.param('creativeDesignCon')==='Creative/Design Concept') msg+= req.param('creativeDesignCon')+' | ';
		if(req.param('creativeTheme')) msg+= req.param('creativeTheme')+' | ';
		if(req.param('video')==='Video') msg+= req.param('video')+' | ';
		if(req.param('digitalAppDes')==='Digital Application Design') msg+= req.param('digitalAppDes')+' | ';
		if(req.param('logo')==='Logo') msg+= req.param('logo')+' | ';
		if(req.param('figureRedraws')==='Figure Redraws') msg+= req.param('figureRedraws')+' | ';
		if(req.param('layout')==='Layout') msg+= req.param('layout')+' | ';
		if(req.param('presentedOther')) msg+= 'Other : ' + req.param('presentedOther')+' | ';
		msg+='<br/>';

		msg+= '<b>Where Will It Be Used:</b> ';
		if(req.param('whereUsedPpt')!== 'false') msg+= req.param('whereUsedPpt')+' | ';
		if(req.param('whereUsedWord')!== 'false') msg+= req.param('whereUsedWord')+' | ';
		if(req.param('whereUsedDigApp')!== 'false') msg+= req.param('whereUsedDigApp')+' | ';
		if(req.param('whereUsedPrint')!== 'false') msg+= req.param('whereUsedPrint')+' | ';
		msg+='<br/>';

		msg+= '<b>Branding:</b> ';
		if(req.param('branded')==='Branded') msg+= req.param('branded')+' | ';
		if(req.param('unbranded')==='Unbranded') msg+= req.param('unbranded')+' | ';
		if(req.param('brandedOther')) msg+= req.param('brandedOther')+' | ';
		msg+='<br/>';

		if(req.param('logosIncluded')) msg+= '<b>Logos To Be Included:</b> '+req.param('logosIncluded')+'<br/>';
		if(req.param('lookAndFeel')) msg+= '<b>Visual style,look and feel, branding specifications:</b> '+req.param('lookAndFeel')+'<br/>';
		if(req.param('scientificBackground')) msg+= '<b>Scientific Background:</b> '+req.param('scientificBackground')+'<br/>';

		if (req.param('extensions')) {
			msg+= '<b>File Format:</b> ';
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
		if(req.param('firstDraftBy') || req.param('firstDraftByTime')) msg+= '<b>First draft by:</b> '+req.param('firstDraftBy').toString()+' '+ req.param('firstDraftByTime')+'<br/>';
		if(req.param('finalDeliveryDate') || req.param('finalDeliveryDateTime')) msg+= '<b>Final delivery date:</b> '+req.param('finalDeliveryDate').toString()+' '+ req.param('finalDeliveryDateTime')+'<br/>';
		if(req.param('asap')) msg+= 'ASAP <br />';

		var recipients = [{
			name: 'Dillon Lee',
			email: 'dillon.lee@chameleon-uk.com',
			type: 'bcc'
		}];

		if (req.param('office') === 'US') {
			recipients.push({
				name: 'Brendan Wallace',
				email: 'bwallace@hcg-int.com',
				type: 'cc'
			});
		} else {
			recipients.push({
				name: 'Editorial',
				email: 'Editorial_Cha@chameleon-uk.com',
				type: 'cc'
			});
		}

		if (req.param('desProj') === 'Design Project') {
			recipients.push({
				name: 'Michaela Hyndman',
				email: 'michaela.hyndman@chameleon-uk.com'
			},{
				name: 'Mark Stevens',
				email: 'mark.stevens@chameleon-uk.com'
			},{
				name: 'Sandra Herrera',
				email: 'sandra.herrera@chameleon-uk.com'
			});
		}


		if (req.param('typeProj') === 'Typesetting Project') {
			recipients.push({
				name: 'Michaela Hyndman',
				email: 'michaela.hyndman@chameleon-uk.com'
			},{
				name: 'Mark Stevens',
				email: 'mark.stevens@chameleon-uk.com'
			},{
				name: 'Janet Nelson',
				email: 'janet.nelson@chameleon-uk.com'
			});
		}


		if (req.param('digProj') === 'Digital Project') {
			recipients.push({
				name: 'Michaela Hyndman',
				email: 'michaela.hyndman@chameleon-uk.com'
			},{
				name: 'Kat Smith',
				email: 'kat.smith@chameleon-uk.com'
			},{
				name: 'Daniel Petroff',
				email: 'daniel.petroff@chameleon-uk.com'
			});
		}

		if(req.param('email')){
			recipients.push({
				email : req.param('email'),
				type: 'cc'
			});
		}





		mandrill('/messages/send', {
			message: {
				to: recipients,
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
				// console.log(req.param('encodedUploads'));
				res.send(response);
				return;
			}
		});

	}

};