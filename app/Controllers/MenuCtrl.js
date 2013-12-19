Grades.controller('MenuCtrl', function ($scope, FormatCourses) {
	$scope.menuLinks = [{link:"home",text:"home"},
						{link:"details",text:"Profile Details"},
						{link:"started",text:"Getting Started"}];

 	$scope.selectedIndex = 0; // Whatever the default selected index is, use -1 for no selection

	$scope.itemClicked = function ($index) {
		$scope.selectedIndex = $index;
	};
})