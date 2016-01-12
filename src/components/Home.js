var React = require('react');
var ChirpInput = require('./ChirpInput');
var ChirpList = require('./ChirpList');
var actions = require('../actions');
var ChirpStore = require('../stores/chirps');

var Home = React.createClass({
    getInitialState: function() {
        return {
            chirps: ChirpStore.all()
        };
    },
    componentDidMount: function() {
        ChirpStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        ChirpStore.removeChangeListener(this.onChange);
    },
    onChange: function() {
        this.setState(this.getInitialState());
    },
    saveChips: function(text) {
        actions.chirp(text);
    },
    render: function() {
        return (
            <div>
                <ChirpInput onSave={this.saveChips}/>
                <ChirpList chirps={this.state.chirps}/>
            </div>
        );
    }
});

module.exports = Home;
