//global angular project variable
var Grades = angular.module( 'Grades', [] );
// perform action function on each element of the array
var forEach = function(array, action) {
	for(var i=array.length-1; i>=0; --i)  action(array[i]);
}