/*
@author		David Nadeau
@page		QueryCourses.js
@purpose	Gather statistics on user courses
*/

Grades.factory('QueryCourses', function (CurrentUser) {

	var sumMarks = function(x) {
		var sum = 0;
		forEach(x,function(c) {
			sum+=+c.mark;
		});
		return sum;
	};

	var Courses = (function() {
		var courses = [];

		return {
			subjectExists: function(c) {
				var dup = false;
				forEach(courses, function(x) {
					if (x.subject === c.subject)
						dup = true;
				});
				return dup;
			},
			subjectUpdate: function(c) {
				if (isNumber(+c.mark)) {
					var weight = c.weight*2;
					forEach(courses, function(x) {
						if (x.subject === c.subject) {
							x.count++;
						}
					});
				}
			},
			subjectInsert: function(c) {
				if (isNumber(+c.mark)) {
					var course = {};
					course.subject = c.subject;
					course.count = 1;
					courses.push(course);
				}
			},
			clear: function() {
				courses.length = 0;
			},
			getCourseDistribution: function() {
				var data = [];
				forEach(courses, function(c) {
					if (c.count>0) {
						data.push({
							key: c.subject,
							value: c.count
						});
					}
				});
				return data;
			},
			yearExists: function(c) {
				var dup = false;
				forEach(courses, function(x) {
					if (x.date === c.year)
						dup = true;
				});
				return dup;
			},
			yearUpdate: function(c) {
				if (isNumber(+c.mark)) {
					var weight = c.weight*2;
					forEach(courses, function(x) {
						if (x.date === c.year) {
							x.average += c.mark*weight;
							x.count+= weight;
						}
					});
				}
			},
			yearInsert: function(c) {
				if (isNumber(+c.mark)) {
					var year = {},
						weight = c.weight*2;
					year.date = c.year;
					year.average = c.mark*weight;
					year.count = weight;
					courses.push(year);
				}
			},
			getGradesByYear: function(val) {
				var entries = [];
				var entry;
				forEach(courses, function(c) {
					entry = new Array(2);
					entry.length = 0;
					entry[0] = new Date().setFullYear(c.date);
					entry[1] = c.average/c.count;
					entries.push(entry);
				});
				return {
					key: val,
					values: entries
				};
			}
		};
	}());

	function getRandomArbitary (min, max) {
	    return Math.random() * (max - min) + min;
	}
	return {
		overalAverage: function(courses) {
			return sumMarks(courses)/courses.length || 0;
		},
		minorAverage: function(courses) {
			var minorCourses = [];
			forEach(courses, function(c) {
				if (c.subject !== CurrentUser.getUser().major) minorCourses.push(c);
			});
			return sumMarks(minorCourses)/minorCourses.length || 0;
		},
		majorAverage: function(courses) {
			var majorCourses = [];
			forEach(courses, function(c) {
				if (c.subject === CurrentUser.getUser().major) majorCourses.push(c);
			});
			return sumMarks(majorCourses)/majorCourses.length || 0;
		},
		courseDistribution: function(courses) {
			Courses.clear();
			forEach(courses, function(c) {
				if (Courses.subjectExists(c))
					Courses.subjectUpdate(c);
				else
					Courses.subjectInsert(c);
			});
			return Courses.getCourseDistribution();
		},
		gradesByYear: function(courses) {
			Courses.clear();
			var data = [];
			forEach(courses, function(c) {
				if (Courses.yearExists(c))
					Courses.yearUpdate(c);
				else
					Courses.yearInsert(c);
			});
			data.push(Courses.getGradesByYear("Overall Average"));
			var fake = Courses.getGradesByYear("Minor Average");
			for (var i=0;i<fake.values.length;i++)
				fake.values[i][1] = fake.values[i][1]*getRandomArbitary(0.7,1.2);
			data.push(fake);
			var faker = Courses.getGradesByYear("Major Average");
			for (var i=0;i<faker.values.length;i++)
				faker.values[i][1] = faker.values[i][1]*getRandomArbitary(0.8,1.2);
			data.push(faker);

			return data;
		},
		totalCredits: function(courses) {
			var count = 0;
			forEach(courses, function(c) {
				count+=+c.credit*+c.weight;
			});
			return count;
		},
		majorCredits: function(courses) {
			var count = 0;
			forEach(courses, function(c) {
				if (c.subject === CurrentUser.getUser().major)
					count+= +c.credit*+c.weight;
			});
			return count;
		},
		minorCredits: function(courses) {
			var count = 0;
			forEach(courses, function(c) {
				if (c.subject !== CurrentUser.getUser().major)
					count+=+c.credit*+c.weight;
			});
			return count;
		}
	};
});