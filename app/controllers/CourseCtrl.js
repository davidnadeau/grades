/*
@author		David Nadeau
@page		CourseCtrl.js
@purpose	Handle all calls to db/forms dealing with courses
*/

Grades.controller('CourseCtrl', function ($scope, Courses, QueryCourses, FormatCourses) {
	var newCourseFormVisibile = false;

	$scope.courses = Courses.query({},function() {
		$scope.overallAverage = QueryCourses.overalAverage($scope.courses);
		$scope.minorAverage = QueryCourses.minorAverage($scope.courses);
		$scope.majorAverage = QueryCourses.majorAverage($scope.courses);
		$scope.totalCredits = QueryCourses.totalCredits($scope.courses);
		$scope.majorCredits = QueryCourses.majorCredits($scope.courses);
		$scope.minorCredits = QueryCourses.minorCredits($scope.courses);

		$scope.courseDistribution = QueryCourses.courseDistribution($scope.courses);
		$scope.gradesByYear = QueryCourses.gradesByYear($scope.courses);
	});

	$scope.onSubmit = function() {
		var courses = FormatCourses.format($scope.courseListInput);
		Courses
			.insert({
				bulkData: courses
			}, function(response) {
				//refresh courses
				$scope.courses = Courses.query({},function() {
					$scope.overallAverage = QueryCourses.overalAverage($scope.courses);
					$scope.minorAverage = QueryCourses.minorAverage($scope.courses);
					$scope.majorAverage = QueryCourses.majorAverage($scope.courses);
					$scope.totalCredits = QueryCourses.totalCredits($scope.courses);
					$scope.majorCredits = QueryCourses.majorCredits($scope.courses);
					$scope.minorCredits = QueryCourses.minorCredits($scope.courses);

					$scope.courseDistribution = QueryCourses.courseDistribution($scope.courses);
					$scope.gradesByYear = QueryCourses.gradesByYear($scope.courses);
				});
			});
		$scope.courseListInput = "";
	};
	$scope.showNewCourseForm = function() {
		newCourseFormVisibile = true;
	};
	$scope.hideNewCourseForm = function() {
		newCourseFormVisibile = false;
		$scope.course = {};
	};
	$scope.isNewCourseFormVisible = function() {
		return newCourseFormVisibile;
	};
	$scope.addNewCourse = function() {
		var courseData = [];
		$scope.course.subject = $scope.course.subject.toUpperCase();
		$scope.course.number = $scope.course.number.toUpperCase();
		$scope.course.credit =		$scope.course.credit === 'y' 
								||	$scope.course.credit === 'Y'
								||	$scope.course.credit === '1' 
								?	1: 0;
								
		courseData.push($scope.course);

		Courses
			.insert({
				bulkData: courseData
			}, function(response) {
				//refresh courses
				$scope.courses = Courses.query({},function() {
					$scope.overallAverage = QueryCourses.overalAverage($scope.courses);
					$scope.minorAverage = QueryCourses.minorAverage($scope.courses);
					$scope.majorAverage = QueryCourses.majorAverage($scope.courses);
					$scope.totalCredits = QueryCourses.totalCredits($scope.courses);
					$scope.majorCredits = QueryCourses.majorCredits($scope.courses);
					$scope.minorCredits = QueryCourses.minorCredits($scope.courses);

					$scope.courseDistribution = QueryCourses.courseDistribution($scope.courses);
					$scope.gradesByYear = QueryCourses.gradesByYear($scope.courses);
				});
			});
		newCourseFormVisibile = false;
		$scope.course = {};
	};
	$scope.deleteCourse = function(course) {
		Courses
			.delete({
				id: course.id
			}, function(response) {
				//refresh courses
				$scope.courses = Courses.query({},function() {
					$scope.overallAverage = QueryCourses.overalAverage($scope.courses);
					$scope.minorAverage = QueryCourses.minorAverage($scope.courses);
					$scope.majorAverage = QueryCourses.majorAverage($scope.courses);
					$scope.totalCredits = QueryCourses.totalCredits($scope.courses);
					$scope.majorCredits = QueryCourses.majorCredits($scope.courses);
					$scope.minorCredits = QueryCourses.minorCredits($scope.courses);

					$scope.courseDistribution = QueryCourses.courseDistribution($scope.courses);
					$scope.gradesByYear = QueryCourses.gradesByYear($scope.courses);
				});
			});
	};
});