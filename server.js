var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 7777;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.get('*', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('server started listening on port ' + port);
});
