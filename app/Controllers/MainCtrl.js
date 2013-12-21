Grades.controller('MainCtrl', function ($scope, FormatCourses, QueryCourses, LoggedIn, Users, CurrentUser, $rootScope) {
	$scope.user = CurrentUser.getUser();
	$scope.onSubmit = function() {
		$scope.courses = FormatCourses.format($scope.courseListInput);
		$rootScope.course = $scope.courses;
		console.log(QueryCourses.courseDistribution($scope.courses));
	};
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
				if (typeof response['name'] === 'undefined') 
					LoggedIn.logOut();
				else {
					CurrentUser.setUser(response);
					LoggedIn.logIn();
					$scope.user = CurrentUser.getUser();
				}
			}
		);
	};
	$scope.register = function() {
		var registrationData = {
			'userName': $scope.userRegistration.name, 
			'userPassword':$scope.userRegistration.password,
			'userMajor':$scope.userRegistration.major
		};
		Users
			.register({
				userData: registrationData
			}, 
			function(response) {
				console.log(response);
			}
		);
	};
	$scope.isLoggedIn = function() {
		return LoggedIn.getLoggedIn();
	}
});