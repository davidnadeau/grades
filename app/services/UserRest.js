/*
@author		David Nadeau
@page		UserRest.js
@purpose	Front end REST calls to php REST api for users
*/

Grades.factory('Users', function($resource) {
	return $resource( '/~dn09uo/project/grades/php/users.php', 
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
});

/*
@purpose	Store user state
*/

Grades.factory('CurrentUser', function () {
	var user = {},
		loggedIn = false;

	return {
		setUser: function(x) {
			user = x;
		},
		getUser: function() {
			return user;
		},
		logIn: function() {
			loggedIn = true;
		},
		logOut: function() {
			loggedIn = false;
		},
		isLoggedIn: function() {
			return loggedIn;
		}
	};
});