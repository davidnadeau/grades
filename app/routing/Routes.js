Grades.config( ['$routeProvider', function( $routeProvider ){
  $routeProvider
    .when( '/home', {
      templateUrl: 'app/partials/home.html',
      controller: 'UserCtrl'
    })
    .when( '/register', {
      templateUrl: 'app/partials/register.html',
      controller: 'UserCtrl'
    })
    .when( '/login', {
      templateUrl: 'app/partials/login.html',
      controller: 'UserCtrl'
    })
    .when( '/details', {
      templateUrl: 'app/partials/details.html',
      controller: 'UserCtrl'
    })
    .when( '/started', {
      templateUrl: 'app/partials/started.html',
      controller: 'UserCtrl'
    })
    .otherwise( {redirectTo: '/home'} );
}]);