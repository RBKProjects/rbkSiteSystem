angular.module('rbkSiteSystem.update', [])

.controller('updateController', function ($scope, User) {
	$scope.user.id = "58eb7d1666fdb12174414540" ;
	$scope.test2 = function () {
		User.update($scope.user).then((data)=> {
			console.log(data)
		})
	}
});
