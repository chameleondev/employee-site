/**
 * Work-requestController
 *
 * @description :: Server-side logic for managing work-requests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

	// index : function(req,res,next){

	// 	// return res.redirect('WorkRequest/form');

	// },

	form : function(req,res,next){

		res.locals.layout = 'work-request-layout';
		res.locals.title = 'Work Request Form';
		res.locals.bodyAttrs = "data-spy=scroll data-target=nav.sidebar ng-controller=FormCtrl uploader=uploader nv-file-drop";
		res.locals.class = 'work-request-form';


		return res.view();
	},

	list : function(req,res,next){

		var skip = 	parseInt(req.param('skip')) || 0;
		var limit = req.param('limit') || 20;
		// var page = 	parseInt(req.param('page')) || 1;
		var search = req.param('search') || null;
		
		res.locals.layout = 'work-request-layout';
		res.locals.title = 'Work Request List';
		res.locals.bodyAttrs = 'ng-controller=listCtrl';
		res.locals.class = 'work-request-list';
		// res.locals.page = page;
		res.locals.skip = skip;
		res.locals.search = req.param('search');

		if (search) {

				WorkRequest.find()
				.where({
					or : [
						{jobCode :{'contains' : search}},
						{client :{'contains' : search}},
					]
				})
				.exec(function(err, results){

					if (err) {
						return next(err);
					}

					res.locals.totalJobs = results.length;
					res.locals.totalPages =  Math.round(res.locals.totalJobs / 20);
					res.locals.currentPage =  skip / limit + 1 ;
					res.locals.jobs = results.slice(skip,skip+20);
					
					
					return res.view();
				});

		} else {

				WorkRequest.count()
				.exec(function(err, results){

					res.locals.totalJobs = results;
					res.locals.totalPages =  Math.round(res.locals.totalJobs / limit);

				});

				WorkRequest.find()
				.limit(limit)
				.skip(skip)
				.exec(function(err, results){

					if (err) {
						return next(err);
					}

					res.locals.currentPage =  skip / limit + 1;

					res.locals.jobs = results;
					
					return res.view();
				});
		}


	},

	// find : function(req,res,next){
	// 	return res.send('hello me');
	// },

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
			jobType : req.param('jobType'),
			client : req.param('client'),
			product : req.param('product'),
			projectTitle : req.param('projectTitle'),
			accountPersonFname : req.param('accountPersonFname'),
			formUser : req.param('formUser'),
			office : req.param('office'),
			email : req.param('email'),
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
			digDes : req.param('digDes'),
			desDir : req.param('desDir'),
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
			selectedDimension : req.param('selectedDimension'),
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
		

	},

	destroy : function(req,res,next){

		WorkRequest.findOne(req.param('id'), function foundRequest(err,job){
			console.log(req);
			console.log(job);

			if(err) return next(err);
			if(!job) return next('Request doesn\'t exist.');

			WorkRequest.destroy(req.param('id'),function jobDestroyed(err){
				if(err) return next(err);

				res.send(req.param('id')+' deleted successfully');
			});

			

		});

	}


	
};

