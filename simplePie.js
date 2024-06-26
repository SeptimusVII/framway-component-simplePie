var Chart = require('chart.js/auto');
module.exports = function(app){
    var SimplePie = Object.getPrototypeOf(app).SimplePie = new app.Component("simplePie");
    // SimplePie.debug = true;
    SimplePie.createdAt      = "2.5.0";
    SimplePie.lastUpdate     = "2.5.0";
    SimplePie.version        = "1";
    // SimplePie.factoryExclude = true;
    // SimplePie.loadingMsg     = "This message will display in the console when component will be loaded.";
    // SimplePie.requires       = [];

    SimplePie.prototype.onCreate = function(){
        var pie = this;
        var dataset;
        try {
            dataset = JSON.parse(pie.getAttr('dataset'))
        } catch(e) {
            if (window[pie.getAttr('dataset')] != undefined && typeof window[pie.getAttr('dataset')] == 'object') {
               dataset = window[pie.getAttr('dataset')]; 
            } else{
                pie.$el.append('<p class="error">Can\'t load pie chart, invalid data provided</p>')
                throw 'invalid data';
            }
        }
        pie.canvas = pie.$el.append('<canvas></canvas>').find('canvas').get(0);
        if (pie.getData('width',false)) pie.canvas.width = pie.getData('width',false);
        

        pie.chart = new Chart(pie.canvas,{
            type: pie.getData('type','pie'),
            data: {
                labels: dataset.map(row => row[pie.getData('labels')]),
                datasets: [
                    {
                        label: pie.getData('dataset-label'),
                        data: dataset.map(row => row[pie.getData('dataset-data')]),
                        backgroundColor: pie.getData('dataset-bgcolor',false) ? dataset.map(row => row[pie.getData('dataset-bgcolor')]) : false,
                    },
                ]
            }
        });
    }
    return SimplePie;
}