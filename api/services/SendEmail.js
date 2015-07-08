// Sends email with mandrill service

module.exports = {
	
	send : function(req,res){

		// var mandrill = require('node-mandrill')('JtgzSVSSdHsYMMWmwY0IEQ');
		
		var msg = '<b>Job Code</b>: '+req.param('jobCode')+'<br/>';

		if(req.param('jobType')) msg+= '<b>Job Type:</b> '+req.param('jobType')+'<br/>';
		if(req.param('client')) msg+= '<b>Client:</b> '+req.param('client')+'<br/>';
		if(req.param('product')) msg+= '<b>Product:</b> '+req.param('product')+'<br/>';
		if(req.param('projectTitle')) msg+= '<b>Project Title:</b> '+req.param('projectTitle')+'<br/>';
		if(req.param('accountPersonFname')) msg+= '<b>Account Person:</b> '+req.param('accountPersonFname')+'<br/>';
		if(req.param('formUser')) msg+= '<b>Form Submitted by:</b> '+req.param('formUser')+'<br/>';
		if(req.param('office')) msg+= '<b>Office:</b> '+req.param('office')+'<br/>';
		// if(req.param('generalDesc')) msg+= '<b>General Description:</b> '+req.param('generalDesc')+'<br/>';
		if(req.param('budget')) msg+= '<b>Budget:</b> '+req.param('budget')+'<br/>';

		msg+= '<b>Type Of Project:</b> ';
		if(req.param('desProj') ==='Design Project') msg+= req.param('desProj')+' | ';
		if(req.param('digProj') ==='Digital Project') msg+= req.param('digProj')+' | ';
		if(req.param('typeProj') ==='Typesetting Project') msg+= req.param('typeProj')+' | ';
		msg+='<br/>';

		if(req.param('taskDesc')) msg+= '<b>Task Description:</b> '+req.param('taskDesc')+'<br/>';
		if(req.param('multiplePieces') ==='Multiple Pieces') msg+= '<b>Pieces:</b> '+req.param('multiplePieces')+'<br/>';
		if(req.param('explainPiece')) msg+= '<b>Other deliverables associated with this job:</b> '+req.param('explainPiece')+'<br/>';

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
			msg+='<br/>';
		}
		

		msg+= '<b>Type Of Work:</b> ';
		if(req.param('mockup')==='Mockup') msg+= req.param('mockup')+' | ';
		if(req.param('creativeDesignCon')==='Creative/Design Concept') msg+= req.param('creativeDesignCon')+' | ';
		if(req.param('creativeTheme')) msg+= req.param('creativeTheme')+' | ';
		if(req.param('video')==='Video') msg+= req.param('video')+' | ';
		if(req.param('digitalAppDes')==='Digital Application Design') msg+= req.param('digitalAppDes')+' | ';
		if(req.param('logo')==='Logo') msg+= req.param('logo')+' | ';
		if(req.param('figureRedraws')==='Figure Redraws') msg+= req.param('figureRedraws')+' | ';
		if(req.param('layout')==='Layout') msg+= req.param('layout')+' | ';
		if(req.param('medicalIllustrations')==='Medical Illustrations') msg+= req.param('medicalIllustrations')+' | ';
		if(req.param('medicalPresentations')==='Medical Presentations') msg+= req.param('medicalPresentations')+' | ';
		if(req.param('infographics')==='Infographics') msg+= req.param('infographics')+' | ';
		if(req.param('ibook')==='iBook') msg+= req.param('ibook')+' | ';
		if(req.param('presentedOther')) msg+= 'Other : ' + req.param('presentedOther')+' | ';
		msg+='<br/>';

		msg+= '<b>Where Will It Be Used:</b> ';
		if(req.param('whereUsedPpt') === 'PPT') msg+= req.param('whereUsedPpt')+' | ';
		if(req.param('whereUsedWord') === 'Word') msg+= req.param('whereUsedWord')+' | ';
		if(req.param('whereUsedDigApp') === 'Digital Application') msg+= req.param('whereUsedDigApp')+' | ';
		if(req.param('whereUsedPrint') === 'Print') msg+= req.param('whereUsedPrint')+' | ';
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

		// if (req.param('dimensions')) {
		// 	msg+= '<b>Dimensions:</b> ';
		// 	for (var i = 0; i < req.param('dimensions').length; i++) {
		// 		msg+= req.param('dimensions')[i]+' | ';
		// 	}
		// 	msg+='<br/>';
		// }

		if (req.param('selectedDimension')) msg+= '<b>Dimension:</b> '+req.param('selectedDimension')+'<br/>';
		if (req.param('orientation')) msg+= '<b>Orientation:</b> '+req.param('orientation')+'<br/>';



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
		if(req.param('deliverySelection')) msg+= '<b>Delivery Selection:</b> '+req.param('deliverySelection');
		if(req.param('twentyFourDate')) msg+= '<b>24 Hour time:</b> '+req.param('twentyFourDate');
		// if(req.param('serverLoc')) msg+= '<b>Server location:</b> '+req.param('serverLoc')+' <br />';


		var formatRow = function(arr){
			var html = '';

			for (var i = 0; i < arr.length; i++) {
				if (i%2 === 0) {
					html+='<tr>\n';
				}

				html+='<td width="100" valign="top">'+arr[i].name+'</td>\n';

				html+='<td width="200" valign="top" style="color:#f5ae16">';

					

					if (arr[i].val && arr[i].val.constructor === Array) {

						for (var n = 0; n < arr[i].val.length; n++) {

							if ((arr[i].val[n] !== 'undefined') && (arr[i].val[n] !== 'false') && (arr[i].val[n] !== undefined)) {
								html+=arr[i].val[n]+'<br>';
							}	
							
						};

					} else {
						if ((arr[i].val !== 'false') && (arr[i].val !== 'undefined') && (arr[i].val !== undefined)) {
							html+=arr[i].val;
						}		
					}

				html+='<br><br></td>\n';

				if (i%2 !== 0) {
					html+='</tr>\n';
				}
			};

			return html;
		};


		var userObject = {
			jobInformation : [
				{name : 'Job Code', val : req.param('jobCode')},
				{name : 'Job Type', val : req.param('jobType')},
				{name : 'Submitted by', val : req.param('formUser')},
				{name : 'Office', val : req.param('office')},
				{name : 'Email', val : req.param('email')},
				{name : 'Client', val : req.param('client')},
				{name : 'Product', val : req.param('product')},
				{name : 'Project Title', val : req.param('projectTitle')},
				{name : 'Account Lead', val : req.param('accountPersonFname')},
				{name : 'Budget', val : req.param('budget')},
				{name : 'Type Of Project', val :[req.param('desProj'),
												req.param('typeProj'),
												req.param('digProj')]}
			],
			task : [
				{name : 'Task Specific Description', val : req.param('taskDesc')},
				{name : 'Any Other Creative Deliverables', val : req.param('explainPiece')},
				{name : 'Studio Hours', val : req.param('studioHours')},
				{name : 'Designer Hours', val : req.param('desHours')},
				{name : 'Senior Designer Hours', val : req.param('sdesHours')},
				{name : 'Digital Designer Hours', val : req.param('digDes')},
				{name : 'Design Director Hours', val : req.param('desDir')},
				{name : 'Creative Director Hours', val : req.param('cdHours')},
				{name : 'Group Director', val : req.param('gdHours')},
				{name : 'Need An Estimate', val : req.param('needEstHours')}
			],
			delivery :[
				{name :'Delivery Type', val : req.param('deliverySelection')},
				{name :'First Draft By Date', val : req.param('firstDraftBy')},
				{name :'First Draft By Time', val : req.param('firstDraftByTime')},
				{name :'Final Delivery Date', val : req.param('finalDeliveryDate')},
				{name :'Final Delivery Time', val : req.param('finalDeliveryDateTime')},
				{name :'24 hour', val : req.param('twentyFourDate')}
			],
			instructions : [
				{name : 'Type of Work', val : [
												req.param('pitchMockup'),
												req.param('creativeDesignCon'),
												req.param('video'),
												req.param('digitalAppDes'),
												req.param('logo'),
												req.param('figureRedraws'),
												req.param('layout'),
												req.param('medicalIllustrations'),
												req.param('medicalPresentations'),
												req.param('infographics'),
												req.param('ibook'),
												req.param('presentedOther')
				]},
				{name : 'Where Will It Be Used', val : [
												req.param('whereUsedPpt'),
												req.param('whereUsedWord'),
												req.param('whereUsedDigApp'),
												req.param('whereUsedPrint'),
												req.param('whereusedOther')
				]},
				{name : 'Branded', val : [
												req.param('branded'),
												req.param('unbranded'),
												req.param('softBranded'),
												req.param('brandedUnknown'),
												req.param('brandedOther')
				]},
				{name : 'Logos To Be Included', val : req.param('logosIncluded')},
				{name : 'Visual Style, Look And Feel', val : req.param('lookAndFeel')},
				{name : 'Scientific Background', val : req.param('scientificBackground')},
				{name : 'Type of File', val : req.param('extensions')},
				{name : 'Dimensions', val : req.param('selectedDimension')},
				{name : 'Orientation', val : req.param('selectedOrientation')},
				{name : 'Pages', val : req.param('pages')}
			],
			attachments : [
				{name : 'Has THis Content Been Editorially Reviewed', val : req.param('editorialReview')},
				{name : 'Agreement', val : req.param('agreement')}
			]
		};

		var recipients = [{
				name: 'Sandra Herrera',
				email: 'sandra.herrera@chameleon-uk.com'
			},{
				name: 'Michaela Hyndman',
				email: 'michaela.hyndman@chameleon-uk.com'
			},{
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


		if (req.param('typeProj') === 'Typesetting Project') {
			recipients.push({
				name: 'Janet Nelson',
				email: 'janet.nelson@chameleon-uk.com'
			});
		}

		if (req.param('desProj') === 'Design Project' || req.param('digProj') === 'Digital Project') {
			recipients.push({
				name: 'Mark Stevens',
				email: 'mark.stevens@chameleon-uk.com'
			});
		}


		if (req.param('digProj') === 'Digital Project') {
			recipients.push({
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





		// mandrill('/messages/send', {
		// 	message: {
		// 		to: recipients,
		// 		from_name: 'Request Form',
		// 		from_email: 'admin@chameleon-web.com',
		// 		html: msg,
		// 		subject: 'New job No: '+ req.param('jobCode'),
		// 		text: "text fallback goes here-- in case some recipients (let\'s say the Chipettes)  can\'t receive HTML emails",
		// 		attachments : req.param('encodedUploads')
		// 	}
		// }, function(error, response){
		// 	//uh oh, there was an error
		// 	if (error) {
		// 		console.log( JSON.stringify(error) );
		// 		res.send(error);
		// 		return;
		// 	}

		// 	//everything's good, lets see what mandrill said
		// 	else{
		// 		// console.log(req.param('encodedUploads'));
		// 		res.send(response);
		// 		return;
		// 	}
		// });

		var mandrill = require('mandrill-api/mandrill');
		var mandrill_client = new mandrill.Mandrill('JtgzSVSSdHsYMMWmwY0IEQ');

		// send email template
		// mandrill('/messages/send-template', {
		// 	template_name : 'work-request-form-reciept',
		// 	template_content : [],
		// 	message: {
		// 		to: [{
		// 			email : 'dillon.lee@chameleon-uk.com',
		// 			name : 'Dillon Lee'
		// 		}],
		// 		from_name: 'Request Form',
		// 		from_email: 'admin@chameleon-web.com',
		// 		merge_language : 'handlebars',
		// 		global_merge_vars : [{
		// 			name: "title",
  //           		content: "Test title"
		// 		}],
		// 		// html: msg,
		// 		subject: 'New job No: '+ req.param('jobCode'),
		// 		text: "text fallback goes here-- in case some recipients (let\'s say the Chipettes)  can\'t receive HTML emails",
		// 		attachments : req.param('encodedUploads')
		// 	}
		// }, function(error, response){
		// 	//uh oh, there was an error
		// 	if (error) {
		// 		console.log( JSON.stringify(error) );
		// 		res.send(error);
		// 		return;
		// 	}

		// 	//everything's good, lets see what mandrill said
		// 	else{
		// 		// console.log(req.param('encodedUploads'));
		// 		res.send(response);
		// 		return;
		// 	}
		// });
		
		var jobInfoContent = formatRow(userObject.jobInformation);
		var taskContent = formatRow(userObject.task);
		var deliveryContent = formatRow(userObject.delivery);
		var instructionsContent = formatRow(userObject.instructions);
		var attachmentsContent = formatRow(userObject.attachments);

		switch (userObject.delivery[0].val){
			case 'Normal':
			var statusImg = 'normal';
			break;

			case '24 Hours':
			var statusImg = '24hours';
			break;

			case 'ASAP':
			var statusImg = 'asap';
			break;
		}


		mandrill_client.messages.sendTemplate({
			template_name : 'work-request-form-reciept',
			template_content : [],
			message: {
				to: [{
					email : 'dillon.lee@chameleon-uk.com',
					name : 'Dillon Lee'
				}],
				from_name: 'Request Form',
				from_email: 'admin@chameleon-web.com',
				merge_language : 'handlebars',
				global_merge_vars : [{
					name: "JobInformation",
            		content: jobInfoContent
				},{
					name: "Task",
            		content: taskContent
				},{
					name: "Delivery",
            		content: deliveryContent
				},{
					name: "Instructions",
            		content: instructionsContent
				},{
					name: "Attachments",
            		content: attachmentsContent
				},{
					name: "StatusImg",
            		content: statusImg
				}],
				// html: msg,
				subject: 'New job No: '+ req.param('jobCode'),
				text: "text fallback goes here-- in case some recipients (let\'s say the Chipettes)  can\'t receive HTML emails",
				attachments : req.param('encodedUploads')
			}
			
		}, function(result) {
		    console.log(result);
		    res.send(result);
			return;
		}, function(e) {
		    // Mandrill returns the error as an object with name and message keys
		    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		    console.log( JSON.stringify(e) );
			res.send(e);
			return;
		});

	}

};