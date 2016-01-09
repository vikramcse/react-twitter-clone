var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var App = require('./components/App.js');

var API = require('./api.js');
var chirpsStore =  require('./stores/chirps.js');
var Home = require('./components/Home.js');

var routes = (
        <Route handler={App}>
            <Route name="home" path="/" handler={Home}/>
        </Route>
    );

API.fetchChirps();

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Root) {
    React.render(<Root />, document.getElementById('app'));
});
