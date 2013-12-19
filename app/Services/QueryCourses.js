Grades.factory('QueryCourses', [function () {
	var sumMarks = function(x) {
    	return x.reduce(function(a, b) { return a.mark + b.mark; }, 0);
  	};
  	
  	var Courses = function() {
  		var majors = [];
  		return {
  			exists: function(c) {
  				var dup = false;
  				forEach(majors, function(m) {
  					if (m.major === c)
  						dup = true;
  				});
  				return dup;
  			},
  			update: function(c) {
  				if (isNumber(c.mark)) {
  					var weight = c.weight*2;
	  				forEach(majors, function(m) {
	  					if (m.major === c.major) {
	  						m.mark+=c.mark*weight;
	  						m.count+=weight;
	  					}
	  				});
	  			}
  			},
  			insert: function(c) {
  				if (isNumber(c.mark)) {
	  				var course = new Object();
	  				var weight = c.weight*2;
					course.major = c.major;
					course.mark = c.mark*weight;
					course.count = weight;
					majors.push(course);
				}
  			},
  			getCourses: function() {
  				return majors;
  			}
  		}
  	}

	return {
		overalAverage: function(courses) {
			return sumMarks(courses)/courses.length;
		},
		minorAverage: function(courses) {
			var minorCourses = [];
			forEach(courses, function(c) {
				if (!c.major === 'COSC') minorCourses.push(c);
			});
			return sumMarks(minorCourses)/minorCourses.length;
		},
		majorAverage: function(courses) {
			var majorCourses = [];
			forEach(courses, function(c) {
				if (c.major === 'COSC') majorCourses.push(c);
			});
			return sumMarks(majorCourses)/majorCourses.length;
		},
		courseDistribution: function(courses) {
			var coursesByMajor = new Courses();
			forEach(courses, function(c) {
				if (coursesByMajor.exists(c.major))
					coursesByMajor.update(c);
				else
					coursesByMajor.insert(c);
			});
			return coursesByMajor.getCourses();
		}
	}
}])