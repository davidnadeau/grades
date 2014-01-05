/*
@author		David Nadeau
@page		CourseCtrl.js
@purpose	highlight menu item
*/

Grades.controller('MenuCtrl', function($scope) {

	$scope.menuLinks = [
		{link:"home",text:"Dashboard",icon:"home"},
		{link:"details",text:"Profile Details",icon:"info"},
		{link:"started",text:"Getting Started",icon:"question"}
	];

	$scope.selectedIndex = 0;

	$scope.itemClicked = function(index) {
		$scope.selectedIndex = index;
	};
});