Grades.controller('CourseCtrl', function ($scope, Courses, QueryCourses, FormatCourses) {
	
	$scope.courses = Courses.query({},function() {
		$scope.overallAverage = QueryCourses.overalAverage($scope.courses);
		$scope.minorAverage = QueryCourses.minorAverage($scope.courses);
		$scope.majorAverage = QueryCourses.majorAverage($scope.courses);

		$scope.courseDistribution = QueryCourses.courseDistribution($scope.courses);
		$scope.gradesByYear = QueryCourses.gradesByYear($scope.courses);
	});

	$scope.onSubmit = function() {
        var courses = FormatCourses.format($scope.courseListInput);
        Courses.
        	insert({
        		bulkData: courses
        	},
        		function(response) {
        			console.log(response);
        		}
        	);
        $scope.courses = Courses.query({},function() {
			$scope.overallAverage = QueryCourses.overalAverage($scope.courses);
			$scope.minorAverage = QueryCourses.minorAverage($scope.courses);
			$scope.majorAverage = QueryCourses.majorAverage($scope.courses);

			$scope.courseDistribution = QueryCourses.courseDistribution($scope.courses);
			$scope.gradesByYear = QueryCourses.gradesByYear($scope.courses);
		});
	}
});