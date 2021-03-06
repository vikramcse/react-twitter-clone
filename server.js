var express = require('express');
var bodyParser = require('body-parser');

var login = require('./login');

var app = express();
var port = 7777;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(login.routes);
app.use(require('./chirps'));
app.get('*', login.required, function(req, res) {
    res.render('index', {
        user: login.safe(req.user)
    });
});

app.listen(port, function() {
    console.log('server started listening on port ' + port);
});
