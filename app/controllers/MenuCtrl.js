Grades.controller('MenuCtrl', function ($scope, FormatCourses, LoggedIn) {
	$scope.menuLinks = [
		{link:"home",text:"home"},
		{link:"details",text:"Profile Details"},
		{link:"started",text:"Getting Started"}
	];

 	$scope.selectedIndex = 0;

	$scope.itemClicked = function ($index) {
		$scope.selectedIndex = $index;
	};
})