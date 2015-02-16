/**
 * Work-requestController
 *
 * @description :: Server-side logic for managing work-requests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

	index : function(req,res,next){

		return res.redirect('WorkRequest/form');

	},

	form : function(req,res,next){

		res.locals.layout = 'work-request-layout.ejs';


		return res.view();
	},

	list : function(req,res,next){

		res.locals.layout = 'work-request-layout';


		return res.view();
	},

	upload : function(req,res,next){


		// var multiparty = require('multiparty');

		var fs = require('fs'),
			file,
			bitmap,
			encoded
		;



		req.file('file_uploads').upload({
			// ...any other options here...
			// maxBytes : 5242880,
			adapter: require('skipper-s3'),
			key: process.env.AWS_KEY || sails.config.aws.key,
			secret: process.env.AWS_SECRET || sails.config.aws.secret,
			bucket: 'work-request-uploads',
			saveAs: function (__newFileStream, cb) {
				cb(null, req.body.jobCode+'_'+__newFileStream.filename);
			}
		},function (err, uploadedFiles){

			if (err) return res.send(500, err);

			// file = uploadedFiles[0].fd;

			// bitmap = fs.readFileSync(file);

			// encoded = new Buffer(bitmap).toString('base64');

			return res.json({
				message: uploadedFiles.length + ' file(s) uploaded successfully!',
				files: uploadedFiles
			});

		});

	},

	create : function(req,res,next){

		

		var userObject = {
			jobCode : req.param('jobCode'),
			client : req.param('client'),
			product : req.param('product'),
			projectTitle : req.param('projectTitle'),
			accountPersonFname : req.param('accountPersonFname'),
			formUser : req.param('formUser'),
			office : req.param('office'),
			generalDesc : req.param('generalDesc'),
			budget : req.param('budget'),
			desProj : req.param('desProj'),
			digProj : req.param('digProj'),
			typeProj : req.param('typeProj'),
			taskDesc : req.param('taskDesc'),
			multiplePieces : req.param('multiplePieces'),
			explainPiece : req.param('explainPiece'),
			needEstHours : req.param('needEstHours'),
			desHours : req.param('desHours'),
			sdesHours : req.param('sdesHours'),
			cdHours : req.param('cdHours'),
			gdHours : req.param('gdHours'),
			mockup : req.param('mockup'),
			creativeDesignCon : req.param('creativeDesignCon'),
			video : req.param('video'),
			digitalAppDes : req.param('digitalAppDes'),
			logo : req.param('logo'),
			figureRedraws : req.param('figureRedraws'),
			layout : req.param('layout'),
			presentedOther : req.param('presentedOther'),
			whereUsedPpt : req.param('whereUsedPpt'),
			whereUsedWord : req.param('whereUsedWord'),
			whereUsedDigApp : req.param('whereUsedDigApp'),
			whereUsedPrint : req.param('whereUsedPrint'),
			branded : req.param('branded'),
			unbranded : req.param('unbranded'),
			softBranded : req.param('softBranded'),
			brandedOther : req.param('brandedOther'),
			logosIncluded : req.param('logosIncluded'),
			lookAndFeel : req.param('lookAndFeel'),
			scientificBackground : req.param('scientificBackground'),
			extensions : req.param('extensions'),
			dimensions : req.param('dimensions'),
			orientations : req.param('orientations'),
			pages : req.param('pages'),
			firstDraftBy : req.param('firstDraftBy'),
			firstDraftByTime : req.param('firstDraftByTime'),
			finalDeliveryDate : req.param('finalDeliveryDate'),
			finalDeliveryDateTime : req.param('finalDeliveryDateTime'),
			asap : req.param('asap'),
			uploadPaths : req.param('uploadPaths')
		};


		WorkRequest.create(userObject,function requestCreated(err,request){

			//If there's an error
			if(err) return next(err);

			// After successfully creating the request
			// redirect to the show action
			// res.json(user);

			// send email 
			SendEmail.send(req,res);

		});



		

	}


	
};

