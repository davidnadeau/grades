function parseFile( file ) {
    $.get(file, function ( data ) {

    }).done(function( data ){
        parseRows(data);
    });
}
function parseRows( file ){
    var table = "";
    var courses = file.split("\n");
    var rows = [];
    var grades = 0, minorGrades = 0, majorGrades = 0;
    var credit = [], minoreCredits = [], majorCredits = [];
    var ncredits = 0, nminorCredits = 0, nmajorCredits = 0;
    var cosc = 0, coop = 0, math = 0;
    var curGrade = 0;
    $.each(courses, function() {
        table += "<tr>";
        var cols = [];
        $.each(this, function(){
            cols.push(this[0]);
        });
        cols = cols.join("");
        var columns = cols.split("\t");
        var row = new Row();
        for(var col in row){
            if(row.hasOwnProperty(col)){
                row[col] = columns.splice(0,1);
                if(col === 'grade' && row['major'][0]!=="Major"){
                    ncredits+=.5;

                    if(row['course'][0].indexOf('COSC')>-1)cosc++;
                    else if(row['course'][0].indexOf('MATH')>-1)math++;
                    if(row['course'][0].indexOf('COSC 2C')>-1){cosc--;coop++;}

                    if(+row[col]!==-1){
                        curGrade = +row[col];
                        if(+row['weight']===1){
                            curGrade *= 2;
                            ncredits+=.5
                        }
                        grades += curGrade;
                        if(+row['major']===1){
                            nmajorCredits+=.5;
                            majorGrades+=curGrade;
                            if(+row['weight']===1){
                                nmajorCredits+=.5
                            }
                        }else{
                            nminorCredits+=.5;
                            minorGrades+=curGrade;
                            if(+row['weight']===1){
                                nminorCredits+=.5
                            }
                        }
                    }
                }
                table += "<td>" + row[col] + "</td>"
            }
        }
        rows.push(row);
        table += "</tr>";
    });
    console.log(cosc,math,coop);
    $('#courses').append("<table>"+table+"</table>");
    var header = "<div class='row'><div class='col-3'>&nbsp;</div><div class='col-3'>Minor</div><div class='col-3'>Major</div><div class='col-3'>Both</div></div>";
    var marks = "<div class='row'><div class='col-3'>Average</div><div class='col-3'>"+
                minorGrades / (nminorCredits*2)
                + "</div><div class='col-3'>"+ majorGrades / (nmajorCredits*2) 
                + "</div><div class='col-3'>"+ grades / (ncredits*2)
                + "</div></div>";
    var credits = "<div class='row'><div class='col-3'>Credits</div><div class='col-3'>"+
                nminorCredits
                + "</div><div class='col-3'>"+ nmajorCredits
                + "</div><div class='col-3'>"+ ncredits
                + "</div></div>";
    var blank = "<div class='row'><div class='col-12'>&nbsp;</div></div>";    
    var headerc = "<div class='row'><div class='col-3'>Course</div><div class='col-9'>Courses</div></div>";    
    var coscc = "<div class='row'><div class='col-3'>Cosc</div><div class='col-9'>"+ cosc + "</div></div>";
    var mathc = "<div class='row'><div class='col-3'>Math</div><div class='col-9'>"+ math + "</div></div>";
    var coopc = "<div class='row'><div class='col-3'>Coop</div><div class='col-9'>"+ coop + "</div></div>";
    $('#detail').append("<div class='container'>"+header+marks+credits+blank+headerc+coscc+mathc+coopc+"</div>");
}
var Row = function() {
    var course, weight, passed, major, grade;

    return {
        // getCourse:  function(){return course;},
        // getWeight:  function(){return weight;},
        // passed:     function(){return passed;},
        // isMajor:    function(){return major;},
        // getGrade:   function(){return grade;},
        course:  function(x){course  = x;},
        weight:  function(x){weight  = x;},
        passed:  function(x){passed  = x;},
        major:   function(x){major   = x;},
        grade:   function(x){grade   = x;}
    }
};