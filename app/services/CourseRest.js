/*
@author		David Nadeau
@page		CourseRest.js
@purpose	Front end REST calls to php REST api for courses
*/

Grades.factory('Courses', function($resource) {
	return $resource( '/~dn09uo/project/grades/php/courses.php', 
		{}, 
		{
			insert: {
				method: 'POST',
				data:{bulkData:"@bulkData"}
			},
			delete: { method: 'POST' }
		}
	);
});