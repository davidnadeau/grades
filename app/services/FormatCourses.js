Grades.factory('FormatCourses', function () {
	function isCrosslisted(x) {
		return x=='*'||x=='#';
	}
	
	return {
		format: function(input) {
			if (typeof input === 'undefined')
				return {};
			var courses = input.split("Select");
			var courseList = [];
			forEach(courses, function(c) {
				var columns = c.split("\t");
				
				//sanitize input
				if (columns.length < 8) 
					return {};

				//first col is useless, remove
				columns.splice(0,1);

				//There is an additional column for crosslisted courses.
				//who cares, remove
				if (isCrosslisted(columns[0].trim())) 
					columns.splice(0,1);

				//fill course object with remaining columns
				var course = {};
				course.year   = columns[0].trim().split(" ")[0];
				//if not a header row
				if (typeof columns[0].trim().split(" ")[1]!=='undefined') {
					course.subject  = columns[0].trim().split(" ")[1].toUpperCase();
					course.number   = columns[0].trim().split(" ")[2].toUpperCase();
					//index [0][3] is duration, too granular, site deals with years
					//index 1 is section, once again too granular
					//index 2 is type (UG), site considers everything an UG credit
					course.weight =+columns[3];
					course.credit = columns[4].trim() === 'Y'?1:0;
					//index 5 is the halfway mark for full year courses.
					//once again, who cares, disregard this col
					course.mark   =+columns[6].split(" ")[0];
					//index 7 is for speciail codes, not using this
					courseList.push(course);
				}
			});
			return courseList;
		}
	};
});