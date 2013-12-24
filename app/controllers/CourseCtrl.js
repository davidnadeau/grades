Grades.controller('CourseCtrl', function ($scope, Courses, QueryCourses) {
	$scope.courses = Courses.query({},function() {
		$scope.overallAverage = QueryCourses.overalAverage($scope.courses);
		$scope.minorAverage = QueryCourses.minorAverage($scope.courses);
		$scope.majorAverage = QueryCourses.majorAverage($scope.courses);

		$scope.courseDistribution = QueryCourses.courseDistribution($scope.courses);
		$scope.gradesByYear = QueryCourses.gradesByYear($scope.courses);
	});

	$scope.onSubmit = function() {
		
	}
});