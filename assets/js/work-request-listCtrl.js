angular.module('WorkRequestForm')

.controller('listCtrl', ['$scope','$http', function($scope,$http){

	$scope.deleteJob = function(jobID,jobCode){
		$scope.deletingID = jobID;
		$scope.deletingCode = jobCode;
		$scope.openPopup = true;
	};
	

}]);

angular.module('WorkRequestForm')

.directive('listedJob',['$http',function($http){
	return {
		restrict : 'A',
		link : function(scope,ele,attrs){

			// console.log(ele.attr('id'));


			ele.on('click',function(){
			
				$http({
					type : 'DELETE',
					url : '/WorkRequest/destroy/'+ele.attr('delete'),
					data : ele.attr('delete') 
				})
				.success(function(data){
					console.log("Deleting job" +ele.attr('delete') );
					location.pathname = "/WorkRequest/list";
				})
				.error(function(err){
					console.log(ele.attr('delete') + ' could not be deleted')
				});


				
			});

			

		}
	}
}]);