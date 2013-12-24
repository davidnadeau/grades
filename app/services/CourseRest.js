Grades.factory('Courses', function($resource) {
	return $resource( '/~dn09uo/project/grades/php/courses.php', {}, {} );
});