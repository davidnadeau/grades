Grades.config( ['$routeProvider', function( $routeProvider ){
  $routeProvider
    .when( '/home', {
      templateUrl: 'pages/home.html',
      controller: 'CourseCtrl'
    })
    .when( '/details', {
      templateUrl: 'pages/details.html',
      controller: 'CourseCtrl'
    })
    .when( '/started', {
      templateUrl: 'pages/started.html',
      controller: 'StartedCtrl'
    })
    .otherwise( {redirectTo: '/home'} );
}]);