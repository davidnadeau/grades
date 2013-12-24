Grades.directive('pieChart', function() {
	return {
        scope: {
          data: '='
      },
      template:"<div id='pie' style='width:100%;'><svg height:50%/></div>",
      restrict: 'E',
      link: function(scope, element, attrs){
          scope.$watch('data', function() {
            nv.addGraph(function() {

              var chart = nv.models.pieChart()
              .x(function(d) { return d.key; })
              .y(function(d) { return d.value; })
              .color(d3.scale.category10().range())
              .showLegend(false);

              d3.select("#pie svg")
              .datum(scope.data||[{key: "No Data",value:1}])
              .transition().duration(1200)
              .call(chart);

              nv.utils.windowResize(chart.update);

              return chart;
          });
        });
      }
  };
});