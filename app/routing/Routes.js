Grades.config( ['$routeProvider', function( $routeProvider ){
  $routeProvider
    .when( '/home', {
      templateUrl: 'app/partials/home.html',
      controller: 'MainCtrl'
    })
    .when( '/register', {
      templateUrl: 'app/partials/register.html',
      controller: 'MainCtrl'
    })
    .when( '/login', {
      templateUrl: 'app/partials/login.html',
      controller: 'MainCtrl'
    })
    .when( '/details', {
      templateUrl: 'app/partials/details.html',
      controller: 'MainCtrl'
    })
    .when( '/started', {
      templateUrl: 'app/partials/started.html',
      controller: 'MainCtrl'
    })
    .otherwise( {redirectTo: '/home'} );
}]);