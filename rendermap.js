var map={};
map.rendermap = function() {
    var width = 500,
        height = 500;

    var projection = d3.geo.mercator();

    var map = void 0;
    var area = void 0;

    var path = d3.geo.path().projection(projection);

    var svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.behavior.zoom().scaleExtent([0.5, 15]).on("zoom", draw))
        .append('g');

    function draw() {
        svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    d3.json('AUS_adm2.json', function(data) {

        var places = topojson.feature(data, data.objects.AUS_adm2);
        var b, s, t;
        projection.scale(1).translate([0, 0]);
        var b = path.bounds(places);
        var s = .9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
        projection.scale(s).translate(t);

        map = svg.append('g').attr('class', 'boundary');
        area = map.selectAll('path').data(places.features);

        area.enter()
            .append('path')
            .attr('d', path)

    });



}();
