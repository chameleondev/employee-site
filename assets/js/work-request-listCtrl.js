angular.module('WorkRequestForm')

.controller('listCtrl', ['$scope','$http', function($scope,$http){
	
	console.log('hello1');

	$http.get('/workrequest/?skip=0&limit=10')
	.then(function(res){
		console.log(res.data);
		console.log('hello');

		$scope.requests = res.data;
	});

	

}]);