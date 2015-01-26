var app = angular.module('WorkRequestForm',['angularFileUpload','naif.base64']);


app.controller('FormCtrl',['$scope','$timeout','FileUploader',function($scope,$timeout,FileUploader){

    window.scope = $scope;

    var totalSize = 0;

	$scope.form = {};

	$scope.form.extensions = [];
	$scope.form.dimensions = [];
	$scope.form.orientations = [];
    $scope.form.encodedUploads = [];

	$scope.extAdd = function(model,selected){
		console.log(model,selected);
		$scope.form[model].push($scope[selected]);
		$scope[selected] = '';
	};

	$scope.extRemove = function(model,index){
		console.log(index);
		$scope.form[model].splice(index,1);
	};

	$scope.removeItem = function(index,item){
        uploader.removeFromQueue(index);

        console.log(item.file.size);

        totalSize-= item.file.size;
    };

	$scope.submit = function(){
        $scope.openPopup = true;

         if ($scope.request_form.$valid && $scope.totalFileSize() < 25 ) {
            $scope.confirmStatus = 2;
        } else{
            $scope.confirmStatus = 1;
        }
	};

    $scope.confirm = function(){
        $scope.confirmStatus = 3;
        uploader.uploadAll();
    };

    $scope.totalFileSize = function(){
        return (totalSize / 1024) / 1024;
    };

    $scope.close = function(){
        $scope.openPopup = false;
        $scope.confirmStatus = 0;
    };

	var uploader = $scope.uploader = new FileUploader({
        url: 'http://www.chameleon-web.com/web-form-uploads/upload.php',
        formData : []
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);

        console.log('size :',fileItem.file.size);

        totalSize+= fileItem.file.size;


    };
    // uploader.onAfterAddingAll = function(addedFileItems) {
    //     console.info('onAfterAddingAll', addedFileItems);
    // };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);

        item.formData.push({
            jobCode : $scope.form.jobCode
        });
        console.log(item);


    };
    // uploader.onProgressItem = function(fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);

        $scope.uploadProgress = progress;
    };
    // uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //     console.info('onSuccessItem', fileItem, response, status, headers);
    // };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);

        // console.log('file name: '+ fileItem.file.name);
        // console.log('file size: '+ fileItem.file.size);
        // console.log('file type: '+ fileItem.file.type);
        // console.log('base64 encoded: '+ response.encodedFile);

        $scope.form.encodedUploads.push({
            type : fileItem.file.type,
            name : fileItem.file.name,
            content : response.encodedFile
        });
    };


    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');

        $.ajax({
            url : 'WorkRequest/create',
            type : 'POST',
            data : $.param($scope.form),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
        }).done(function(msg){

            $timeout(function(){
                $scope.confirmStatus = 4;
                $scope.form = {};
                uploader.clearQueue();
            });
           
            console.log(msg);

        }).fail(function(jqXHR, textStatus){
            $scope.confirmStatus = 5;
            $scope.errorMessage = textStatus.message;
            console.log( "Request failed: " + textStatus );
        });
    };

    console.info('uploader', uploader);


}]);


app.directive('datePicker', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

			element.datepicker({format : 'dd-mm-yyyy',})
				.on('changeDate',function(ev){


					// get the property of the form object
					var val = element.attr('ng-model').slice(5);


					// apply the changes to the scope
					scope.$apply(function(){
						// set the value of the property
						scope.form[val] = ev.target.value;
					});

					element.datepicker('hide');
				
				})

        }
    };
}); 
