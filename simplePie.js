module.exports = function(app){
    var SimplePie = Object.getPrototypeOf(app).SimplePie = new app.Component("simplePie");
    // SimplePie.debug = true;
    SimplePie.createdAt      = "2.5.0";
    SimplePie.lastUpdate     = "2.5.0";
    SimplePie.version        = "1";
    // SimplePie.factoryExclude = true;
    // SimplePie.loadingMsg     = "This message will display in the console when component will be loaded.";
    // SimplePie.requires       = [];

    // SimplePie.prototype.onCreate = function(){
    // do thing after element's creation
    // }
    return SimplePie;
}