Grades.config( ['$routeProvider', function( $routeProvider ){
  $routeProvider
    .when( '/home', {
      templateUrl: 'pages/home.html',
      controller: 'MainCtrl'
    })
    .when( '/register', {
      templateUrl: 'pages/register.html',
      controller: 'MainCtrl'
    })
    .when( '/login', {
      templateUrl: 'pages/login.html',
      controller: 'MainCtrl'
    })
    .when( '/details', {
      templateUrl: 'pages/details.html',
      controller: 'MainCtrl'
    })
    .when( '/started', {
      templateUrl: 'pages/started.html',
      controller: 'MainCtrl'
    })
    .otherwise( {redirectTo: '/home'} );
}]);