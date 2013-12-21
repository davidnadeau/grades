Grades.controller('CourseCtrl', function ($scope, FormatCourses, QueryCourses, Users, $rootScope) {
	$scope.onSubmit = function() {
		$scope.courses = FormatCourses.format($scope.courseListInput);
		$rootScope.course = $scope.courses;
		console.log(QueryCourses.courseDistribution($scope.courses));
	};
	$scope.verifyUser = function() {
		$scope.user  = Users.get({'userName':$scope.user.name});
	};
	$scope.isLoggedIn = function() {
		
	}
});