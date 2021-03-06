/*
@author		David Nadeau
@page		UserCtrl.js
@purpose	Handle all calls to db/forms dealing with user profiles
*/

Grades.controller('UserCtrl', function ($scope, Users, CurrentUser, $cookieStore, $location) {
	$scope.user = CurrentUser.getUser();
	
	if (typeof $cookieStore.get('name') !== 'undefined') {
		if (!CurrentUser.isLoggedIn()) {
			var loginData = {
				'userName': $cookieStore.get('name'),
				'userPassword': 'spoof',
				'loggedIn': 'spoof'
			};
			Users
				.login({
					userData: loginData
				}, 
				function(response) {
					CurrentUser.setUser(response);
					CurrentUser.logIn();
					$scope.user = CurrentUser.getUser();
				}
			);
		}
	}
	
	$scope.login = function() {
		var loginData = {
			'userName': $scope.userLogin.name, 
			'userPassword':$scope.userLogin.password
		};

		Users
			.login({
				userData: loginData
			}, 
			function(response) {
				if (typeof response.name === 'undefined') {
					CurrentUser.logOut();
					$location.path('#/home').replace();
				}
				else {
					CurrentUser.setUser(response);
					CurrentUser.logIn();
					$scope.user = CurrentUser.getUser();
					$cookieStore.put('name',$scope.user.name);
					$location.path('#/home').replace();
				}
			}
		);
	};
	$scope.register = function() {
		var major = $scope.userRegistration.major.toUpperCase();
		var registrationData = {
			'userName': $scope.userRegistration.name, 
			'userPassword':$scope.userRegistration.password,
			'userMajor':major
		};
		Users
			.register({
				userData: registrationData
			}, 
			function(response) {
					CurrentUser.setUser(response);
					CurrentUser.logIn();
					$scope.user = CurrentUser.getUser();
					$cookieStore.put('name',$scope.user.name);					
					$location.path('#/home').replace();
			}
		);
	};
	$scope.status = function() {
		return CurrentUser.isLoggedIn();
	};
	$scope.logout = function() {
		CurrentUser.logOut();
		CurrentUser.setUser({});
		$cookieStore.put('name',undefined);
	};
});