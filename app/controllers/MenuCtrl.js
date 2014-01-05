/*
@author		David Nadeau
@page		CourseCtrl.js
@purpose	highlight menu item
*/

Grades.controller('MenuCtrl', function($scope,$location) {

	$scope.menuLinks = [
		{link:"home",text:"Dashboard",icon:"home"},
		{link:"details",text:"Course Details",icon:"info"},
		{link:"started",text:"Getting Started",icon:"question"}
	];

    $scope.isActive = function(route) {
        return route === $location.path();
    };
});