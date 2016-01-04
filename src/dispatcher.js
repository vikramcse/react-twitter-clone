var Flux = require('flux');
var dispatcher = module.exports = new Flux.Dispatcher();

dispatcher.register(function(action) {
    console.log(action);
});
