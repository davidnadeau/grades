Grades.directive('stackedChart', function() {
	return {
    scope: {
      data: '='
    },
    template:"<div id='stacked' style='width:100%;height:500px;'><svg/></div>",
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.$watch('data', function() {
        console.log(scope.data);
        var colors = d3.scale.category20();
        var keyColor = function(d, i) {return colors(d.key);};

        var chart;
        nv.addGraph(function() {
          chart = nv.models.stackedAreaChart()
          .useInteractiveGuideline(true)
          .x(function(d) { return d[0]; })
          .y(function(d) { return d[1]; })
          .color(keyColor)
          .transitionDuration(300)
          .clipEdge(true);

          chart.xAxis
          .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)); });

          chart.yAxis
          .tickFormat(d3.format(',.2f'));

          d3.select('#stacked svg')
          .datum(scope.data||[{key:"No Data",values:[[0,0]]}])
          .transition().duration(0)
          .call(chart);

          nv.utils.windowResize(chart.update);
          return chart;
        });
      });
    }
  };
});