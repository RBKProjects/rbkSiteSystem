angular.module('rbkSiteSystem.auth', [])

.controller('authController', function ($scope, User, $location, $window ) {

	let isMatch = (firstValue, secValue)=> {
		return firstValue === secValue
	}

	$scope.signup = (user)=> {
		User.signup(user)
		.then((data)=> {
			$scope.signin({email : user.email, password : user.password })
		})
	}

	$scope.signin =  (user)=> {
		User.login(user).then((data)=>{
			$window.localStorage['isLogin'] = true;
			$window.localStorage['token'] = data.data.token;
			$window.localStorage['userName']
      		$window.localStorage['id'] = data.data.userName;
			User.isEmailVerified(data.data).then((resp)=>{
				if (resp.data){
					$location.path('/update/'+ data.data['id']);
					$window.location.reload();
				}else{
					$location.path('/verify/'+ data.data['id']);
					$window.location.reload();
				}
			})
		})
	}

	$scope.verify = (code)=> {
		User.verifyUser({
			id : $window.localStorage['id'],
			code : code
		}).then((resp)=>{
			if(resp.data.isEmailVerified){
				$location.path('/update/:'+ $window.localStorage['id']);
				$window.location.reload();
			}
		})
	}
});
