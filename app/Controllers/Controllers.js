Grades.controller('CourseCtrl', function ($scope, FormatCourses) {
	$scope.onSubmit = function() {
		$scope.courses = FormatCourses.format($scope.courseListInput);
	}
})