Grades.controller('MenuCtrl', function ($scope, FormatCourses) {
	$scope.menuLinks = [
		{link:"home",text:"Home",icon:"home"},
		{link:"details",text:"Profile Details",icon:"info"},
		{link:"started",text:"Getting Started",icon:"question"}
	];

 	$scope.selectedIndex = 0;

	$scope.itemClicked = function ($index) {
		$scope.selectedIndex = $index;
	};
})