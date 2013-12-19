Grades.config( ['$routeProvider', function( $routeProvider ){
  $routeProvider
    .when( '/profile/', {
      templateUrl: 'partials/profile_list.html',
      controller: 'ProfileListCtrl'
    })
      
    .when( '/profile/:id', {
      templateUrl: 'partials/profile_detail.html',
      controller: 'ProfileDetailCtrl'
    })

    .otherwise( {redirectTo: '/profile'} );
}]);
