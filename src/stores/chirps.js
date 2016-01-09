var constants = require('../constants.js');
var store = require('./store.js');

var ChirpStore = module.extends = store.extend({
    init: function() {
        this.bind(constants.GOT_CHIRPED, this.set);
        this.bind(constants.CHIRPED, this.add);
    }
});
