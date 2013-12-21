Grades.factory('Courses', ['$resource', function($resource) {
	return $resource( '/~dn09uo/project/grades/courses.php', {}, {} );
}]);