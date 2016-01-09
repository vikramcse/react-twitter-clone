var React = require('react');
var ChirpInput = require('./ChirpInput');
var actions = require('../actions');

var Home = React.createClass({
    saveChips: function(text) {
        actions.chirp(text);
    },
    render: function() {
        return (
            <div>
                <ChirpInput onSave={this.saveChips}/>
            </div>
        );
    }
});

module.exports = Home;
