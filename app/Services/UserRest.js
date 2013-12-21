Grades.factory('Users', ['$resource', function($resource) {
	return $resource( '/~dn09uo/project/grades/users.php', 
		{}, 
		{ 
			login: {
				method: 'GET',
				data:{userData:"@userData"}
			},
			register: {
				method: 'POST',
				data:{userData:"@userData"}
			}
		} 
	);
}]);
Grades.factory('LoggedIn', [function () {
	var loggedIn = false;

	return {
		logIn: function() {
			loggedIn = true;
		},
		logOut: function() {
			loggedIn = false;
		},
		getLoggedIn: function() {
			return loggedIn;
		}
	};
}])
Grades.factory('CurrentUser', [function () {
	var user = {};

	return {
		setUser: function(x) {
			user = x;
		},
		getUser: function() {
			return user;
		}
	};
}])