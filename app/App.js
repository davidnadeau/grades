//global angular project variable
var Grades = angular.module( 'Grades', [ 'ngRoute','ngResource','ngCookies','ngAnimate'] );
// perform action function on each element of the array
var forEach = function(array, action) {
	for(var i=array.length-1; i>=0; --i)  action(array[i]);
};
// determine if value is a number
var isNumber = function(value) {return typeof value == 'number' && !isNaN(value);};