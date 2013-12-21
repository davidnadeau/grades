Grades.factory('QueryCourses', [function () {
	var sumMarks = function(x) {
    	return x.reduce(function(a, b) { return a.mark + b.mark; }, 0);
  	};
  	
  	var Courses = function() {
  		var subjects = [];
  		return {
  			exists: function(c) {
  				var dup = false;
  				forEach(subjects, function(m) {
  					if (m.subject === c.subject)
  						dup = true;
  				});
  				return dup;
  			},
  			update: function(c) {
  				if (isNumber(c.mark)) {
  					var weight = c.weight*2;
	  				forEach(subjects, function(m) {
	  					if (m.subject === c.subject) {
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
					course.subject = c.subject;
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
				if (!c.subject === 'COSC') minorCourses.push(c);
			});
			return sumMarks(minorCourses)/minorCourses.length;
		},
		majorAverage: function(courses) {
			var majorCourses = [];
			forEach(courses, function(c) {
				if (c.subject === 'COSC') majorCourses.push(c);
			});
			return sumMarks(majorCourses)/majorCourses.length;
		},
		courseDistribution: function(courses) {
			var coursesBySubject = new Courses();
			forEach(courses, function(c) {
				if (coursesBySubject.exists(c))
					coursesBySubject.update(c);
				else
					coursesBySubject.insert(c);
			});
			return coursesBySubject.getCourses();
		}
	}
}])