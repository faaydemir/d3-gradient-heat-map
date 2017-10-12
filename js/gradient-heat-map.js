

var configDefault =
{
    colors: ["#2c7bb6", "#00a6ca", "#00ccbc", "#90eb9d", "#ffff8c", "#f9d057", "#f29e2e", "#e76818", "#d7191c"],
    width: 100,
    height: 100,
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
}



function DrawGradientHeatMap(containerSvg, config, dataConfig, data) {

var svg = containerSvg.append("g");
var defs = svg.append("defs");

var dataYDomain = d3.extent(data, function (d) {
    return d[dataConfig.y];
});
var dataXDomain = d3.extent(data, function (d) {
    return d[dataConfig.x];
});

var colorScale = d3.scale.quantile()
    .domain(dataYDomain)
    .range(config.colors);

defs.append("linearGradient")
    .attr("id", "gradient-rainbow-colors")
    .attr("x1", config.x1)
    .attr("y1", config.y1)
    .attr("x2", config.x2)
    .attr("y2", config.y2)
    .selectAll("stop")
    .data(data)
    .enter().append("stop")
    .attr("offset", function (d, i) { return i / (data.length - 1); }) // should be related with data x
    .attr("stop-color", function (d) { return colorScale(d[dataConfig.y]) });



var heatMap = svg.append("rect")
    .attr("class", "gradientHeatMap")
    .attr("x", 0)
    .attr("y", 0)
    //.attr("rx", legendHeight/2)
    .attr("width", config.width)
    .attr("height", config.height)
    .style("fill", "url(#gradient-rainbow-colors)");

update = function (config,  data,dataConfig, duration) {

    dataYDomain = d3.extent(data, function (d) {
        return d[dataConfig.y];
    });
    dataXDomain = d3.extent(data, function (d) {
        return d[dataConfig.x];
    });

    colorScale = d3.scale.quantile()
        .domain(dataYDomain)
        .range(config.colors);

    defs.select("#gradient-rainbow-colors").selectAll("stop").remove();

    defs.select("#gradient-rainbow-colors").selectAll("stop")
        .data(data)
        .enter()
        .append("stop")
        .attr("offset", function (d, i) {
            return i / (data.length - 1);
        })
        .attr("stop-color", function (d) {
            return colorScale(d[dataConfig.y]);
        });

    heatMap.style("fill", "url(#gradient-rainbow-colors)")
}
return { 'update': update }
}
