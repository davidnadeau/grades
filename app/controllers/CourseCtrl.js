Grades.controller('CourseCtrl', function ($scope, Courses) {
	$scope.courses = Courses.query();
})