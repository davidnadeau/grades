Grades.controller('CourseCtrl', function ($scope, FormatCourses, QueryCourses, $rootScope) {
	$scope.onSubmit = function() {
		$scope.courses = FormatCourses.format($scope.courseListInput);
		$rootScope.course = $scope.courses;
		console.log(QueryCourses.courseDistribution($scope.courses));
	}
})