angular.module('WorkRequestForm')

.controller('listCtrl', ['$scope','$http', function($scope,$http){

	

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
					url : '/WorkRequest/destroy/'+ele.attr('id'),
					data : ele.attr('id') 
				})
				.success(function(data){
					scope.deletedJob = data;
				})
				.error(function(err){
					console.log(ele.attr('id') + ' could not be deleted')
				});
			});

			

		}
	}
}]);