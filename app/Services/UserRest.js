Grades.factory('Users', ['$resource', function($resource) {
	return $resource( '/~dn09uo/project/grades/users.php', 
		{userName: '@userName'}, {} );
}]);