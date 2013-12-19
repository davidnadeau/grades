Grades.factory('FormatCourses', [function () {
	function isCrosslisted(x) {
		return x=='*'||x=='#'
	}
	
	return {
		format: function(input) {
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
				var course = new Object();
				//messy split, column 0 contains a lot of information
				course.year   = columns[0].trim().split(" ")[0];
				course.major  = columns[0].trim().split(" ")[1];
				course.name   = columns[0].trim().split(" ")[2];
				course.dur    = columns[0].trim().split(" ")[3];
				course.sec    = columns[1].trim();
				course.type   = columns[2].trim();
				course.weight =+columns[3];
				course.credit = columns[4].trim();
				//index 5 is the halfway mark for full year courses.
				//once again, who cares, disregard this col
				course.mark   =+columns[6].split(" ")[0];
				course.sCodes = columns[7]?columns[7].trim():"na";
				courseList.push(course);
	    	});
	    	return courseList;
		}
	};
}])