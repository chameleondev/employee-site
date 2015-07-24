// Sends email with mandrill service

module.exports = {
	
	send : function(req,res){

		// mandrill details
		var mandrill = require('mandrill-api/mandrill');
		var mandrill_client = new mandrill.Mandrill('JtgzSVSSdHsYMMWmwY0IEQ');
		
		// format html for email
		var formatRow = function(arr){
			var html = '';

			for (var i = 0; i < arr.length; i++) {
				if (i%2 === 0) {
					html+='<tr>\n';
				}

				html+='<td width="150" valign="top" style="color:#f5ae16;padding-bottom:10px">'+arr[i].name+'</td>\n';

				html+='<td width="250" valign="top" style="padding-bottom:10px">';

					

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

				html+='</td>\n';

				if (i%2 !== 0) {
					html+='</tr>\n';
				}
			};

			return html;
		};

		// object that holds all the request parameters, grouped into sections
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


		// create the recipients array
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
		
		// format the content with formatRow function
		var jobInfoContent = formatRow(userObject.jobInformation);
		var taskContent = formatRow(userObject.task);
		var deliveryContent = formatRow(userObject.delivery);
		var instructionsContent = formatRow(userObject.instructions);
		var attachmentsContent = formatRow(userObject.attachments);

		// value for flag
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

		// to indicate the type of job 
		var jobIndicators = [];

		if ((req.param('desProj') !== 'false') && (req.param('desProj') !== 'undefined') && (req.param('desProj') !== undefined)) {
			jobIndicators.push('desProj');
		}

		if ((req.param('typeProj') !== 'false') && (req.param('typeProj') !== 'undefined') && (req.param('typeProj') !== undefined)) {
			jobIndicators.push('typeProj');
		}


		if ((req.param('digProj') !== 'false') && (req.param('digProj') !== 'undefined') && (req.param('digProj') !== undefined)) {
			jobIndicators.push('digProj');
		}


		// send email using template in mandrill
		mandrill_client.messages.sendTemplate({
			template_name : 'work-request-form-reciept',
			template_content : [],
			message: {
				to: [{
					name : 'Dillon Lee',
					email : 'dillon.lee@chameleon-uk.com'
				},{
					name: 'Michaela Hyndman',
					email: 'michaela.hyndman@chameleon-uk.com'
				},{
					name: req.param('formUser'),
					email: req.param('email'),
					type: 'cc'
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
				},{
					name: "JobIndicators",
            		content: jobIndicators
				}],
				// html: msg,
				subject: 'New job No: '+ req.param('jobCode'),
				text: "A new job has been submitted, job no:"+ req.param('jobCode') + "/n In order to see the content please view in HTML",
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