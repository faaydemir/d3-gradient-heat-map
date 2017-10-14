

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
    var scaleX = d3.scale.linear()
        .range([0, 1])
        .domain(dataXDomain);


    function ColorScale(data, colors, key) {

        var getValue = function (d) {
            return (typeof key != 'undefined') ? d[key] : d
        };
        var dataRange = d3.extent(data, getValue);
        var scaleCount = (colors.length - 1);
        var colorScaleRange = (dataRange[1] - dataRange[0]) / scaleCount;
        var scales = [];

        for (var i = 0; i < scaleCount; i++) {
            var a = d3.scale.linear().range([colors[i], colors[i + 1]]).domain([i * colorScaleRange, (i + 1) * colorScaleRange])
            scales.push(a);
        }

        var scale = function (d) {
            var scaleIndex = Math.floor(getValue(d) / colorScaleRange);
            if (scaleIndex >= scales.length) {
                scaleIndex = scales.length - 1;
            }
            var scalefunction = scales[scaleIndex]
            return (scalefunction(getValue(d)));
        }

        return scale;
    }

    var colorScale = ColorScale(data,config.colors,dataConfig.y);


    defs.append("linearGradient")
        .attr("id", "gradient-rainbow-colors")
        .attr("x1", config.x1)
        .attr("y1", config.y1)
        .attr("x2", config.x2)
        .attr("y2", config.y2)
        .selectAll("stop")
        .data(data)
        .enter().append("stop")
        .attr("offset", function (d, i) { return scaleX(d[dataConfig.x]) })
        .attr("stop-color", function (d) { return colorScale(d) });



    var heatMap = svg.append("rect")
        .attr("class", "gradientHeatMap")
        .attr("x", 0)
        .attr("y", 0)
        //.attr("rx", legendHeight/2)
        .attr("width", config.width)
        .attr("height", config.height)
        .style("fill", "url(#gradient-rainbow-colors)");

    update = function (config, data, dataConfig, duration) {

        colorScale = ColorScale(data,config.colors,dataConfig.y)

        dataYDomain = d3.extent(data, function (d) {
            return d[dataConfig.y];
        });
        dataXDomain = d3.extent(data, function (d) {
            return d[dataConfig.x];
        });
        scaleX.domain(dataXDomain);

        defs.select("#gradient-rainbow-colors").selectAll("stop").remove();

        defs.select("#gradient-rainbow-colors").selectAll("stop")
            .data(data)
            .enter()
            .append("stop")
            .attr("offset", function (d, i) { return scaleX(d[dataConfig.x]) })
            .attr("stop-color", function (d) {
                return colorScale(d);
            });

        heatMap.style("fill", "url(#gradient-rainbow-colors)");
    }
    return { 'update': update }
}
