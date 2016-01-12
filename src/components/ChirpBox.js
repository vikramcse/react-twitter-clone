var React = require('react');
var utils = require('../utils');
var Link = require('react-router').Link;
var moment = require('moment');

var ChirpBox = React.createClass({
    render: function() {
        var user = this.props.chirp;
        return (
            <li className="row chirp">
                <Link className="two columns" to='user' params={{id: user.userId}}>
                    <img src={utils.avatar(user.email)} />
                </Link>
                <div className="ten columns">
                    <p>
                        <strong> {user.fullname} </strong>
                        <span className="timestamp">
                            @{user.username} {moment(user.$created).fromNow()}
                        </span>
                    </p>
                    <p>{user.text}</p>
                </div>
            </li>
        );
    }
});

module.exports = ChirpBox;
