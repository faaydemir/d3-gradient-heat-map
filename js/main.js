

var dataLength = Math.random() * 90 + 10;


var data = [];
var config =
    {
        colors: ["#2c7bb6", "#00a6ca", "#00ccbc", "#90eb9d", "#ffff8c", "#f9d057", "#f29e2e", "#e76818", "#d7191c"],
        width: '100%',
        height: '30',
        x1: '0%',
        y1: '0%',
        x2: '100%',
        y2: '0%',
    }
var dataConfig = {
    x: 'x',
    y: 'y',
}
var svg = d3.select('#gradientHeatMap').append("svg").attr("width","100%").attr("height","100%");

var view = DrawGradientHeatMap(svg, config, data, dataConfig);


function updateHeatMap() {
    var length = 60;
    var current = (new Date()).getSeconds();
    var data = [];

    for (var i = 1; i <= 60; i++) {
        data.push({'x':i ,'y': 60-Math.abs(current-i)});
    }

    view.update(config, data, dataConfig,1000);
    setInterval(updateHeatMap, 1000);
}
updateHeatMap();