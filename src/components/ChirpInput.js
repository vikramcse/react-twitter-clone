var React = require('react');

var ChirpInput = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        };
    },
    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },
    handleClick: function() {
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    },
    render: function() {
        return (
            <div className="row">
                <div className="nine columns">
                    <input className="u-full-width"
                            type="text"
                            value={this.state.value}
                            placeholder="say something !"
                            onChange={this.handleChange}/>
                </div>
                <div className="three columns">
                    <button className="u-full-width button-primary"
                            onClick={this.handleClick}>
                            Chirp
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = ChirpInput;
