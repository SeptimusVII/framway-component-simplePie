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
        var datasets;
        try {
            datasets = JSON.parse(pie.getAttr('datasets'))
        } catch(e) {
            if (window[pie.getAttr('datasets')] != undefined) {
                datasets = window[pie.getAttr('datasets')];
                if (typeof window[pie.getAttr('datasets')] != 'object'){
                    pie.$el.append('<p class="error txt-center">Can\'t load pie chart, invalid data provided</p>');
                    return false;
                }
            } else{
                pie.$el.append('<p class="error txt-center">Can\'t load pie chart, no data provided</p>');
                return false;
            }
        }

        pie.config = {
            type: pie.getData('type','pie'),
            data: datasets,
            // data: {
            //     labels: dataset.map(row => row.data.label),
            //     datasets: [
            //         {
            //             label: pie.getData('dataset-label'),
            //             data: dataset.map(row => row[pie.getData('dataset-data')]),
            //             backgroundColor: pie.getData('dataset-bgcolor',false) ? dataset.map(row => row[pie.getData('dataset-bgcolor')]) : false,
            //         },
            //     ],
            // },
            options: {
                plugins: {
                    legend:{
                        labels:{}
                    }
                },
            }
        };

        pie.canvas = pie.$el.append('<canvas></canvas>').find('canvas').get(0);
        
        if (pie.getData('width',false)) 
            pie.canvas.parentNode.style.width = pie.getData('width',false);
        if (pie.getData('height',false))
            pie.canvas.parentNode.style.height = pie.getData('height',false);

        if (pie.getData('title',false)){
            pie.config.options.plugins.title = {
                display: true,
                text: pie.getData('title',false)
            }
        }
        if (pie.getData('legend-position',false)){
            pie.config.options.plugins.legend = {
                position: pie.getData('legend-position',false)
            }
        }

        console.log(pie.config);
        pie.chart = new Chart(pie.canvas,pie.config);
    }
    return SimplePie;
}