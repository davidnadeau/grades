Grades.directive('pieChart', function() {
	return {
    template:"<div id='pie' style='width:100%;'><svg height:50%/></div>",
		restrict: 'E',
		link: function(scope, element, attrs){

            var testdata = [
            {
              key: "One",
              y: 5
          },
          {
              key: "Two",
              y: 2
          },
          {
              key: "Three",
              y: 9
          },
          {
              key: "Four",
              y: 7
          },
          {
              key: "Five",
              y: 4
          },
          {
              key: "Six",
              y: 3
          },
          {
              key: "Seven",
              y: .5
          }
          ];


          nv.addGraph(function() {

            var chart = nv.models.pieChart()
              .x(function(d) { return d.key })
              .y(function(d) { return d.y })
              .color(d3.scale.category10().range())
              .showLegend(false);

            d3.select("#pie svg")
              .datum(testdata)
              .transition().duration(1200)
              .call(chart);
            
            nv.utils.windowResize(chart.update);

            return chart;
        });
      }
  }
});