Grades.controller('StartedCtrl', function ($scope, Courses) {
	$scope.getCourses = function() {
		$scope.courses = Courses.query();
		console.log($scope.courses);
	};
});