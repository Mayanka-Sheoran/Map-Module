map.util = (function() {

    var places = {};
    var area = {};

    return {
        places: places,
        area: area

    }
}());

map.rendermap = (function() {


    var width = 1000,
        height = 1000;

    var projection = d3.geo.mercator();

    var boundary = void 0;

    var tooltip = d3.select("#map").append("div")
        .attr("class", "tooltip");


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

    d3.json("IND_adm3.json", function load(data) {


        map.util.places = topojson.feature(data, data.objects.IND_adm3);
        var b, s, t;
        projection.scale(1).translate([0, 0]);
        var b = path.bounds(map.util.places);
        var s = .9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
        projection.scale(s).translate(t);

        boundary = svg.append('g').attr('class', 'boundary');
        map.util.area = boundary.selectAll('path').data(map.util.places.features);

        map.util.places.features.forEach(function(d, i) {

            d.name = map.util.places.features[i].properties.NAME_3;

            

        });


        map.util.area.enter()
            .append('path')
            .attr('d', path)
            .attr("title", function(d, i) {
                return d.name;
            })

        map.colorModule.changedcolor();




        map.util.area
            .on("mouseover", function(d, i) {
                var mouse = d3.mouse(svg.node()).map(function(d) {
                    return parseInt(d);
                });

                tooltip
                    .classed("hidden", false)
                    .attr("style", "left:" + (mouse[0] + 25) + "px;top:" + mouse[1] + "px")
                    .html(d.name)
            })
            .on("mouseout", function(d, i) {
                tooltip.classed("hidden", true)
            });

    });



})();
