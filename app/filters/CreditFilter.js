Grades.filter( 'creditFilter', function() {
    return function( input ) {
      switch( input ) {
        case '0': return "No";
        case '1': return "Yes";
        default: return "NA";
      }
    };
});