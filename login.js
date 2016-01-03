var passport = require('passport');
var LocalStrategy = require('passport-local');

var LocallyDB = require('locallydb');
var db = new LocallyDB('./.data');
var users = db.collection('users');

var crypto = require('crypto');

// Middlewares
var router = require('express').Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var hash = function(password) {
    return crypto.createhash('sha512').update(password).digest('hex');
};

passport.use(new LocalStrategy(function(username, password, done) {
    var user = users.where({
        username: username,
        passwordHash: hash(password)
    }).items[0];

    if(user) {
        done(null, user);
    } else {
        done(null, false);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.cid);
});

passport.deserializeUser(function(cid, done) {
    done(null, users.get(cid));
});

// Middleware configuration
router.use(bodyParser.urlencoded({exteded: true})); // parsing url on login page
router.use(bodyParser.json()); // API
router.use(cookieParser());
router.use(session({
    secret: 'this is a secret message',
    resave: false,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

// Routes
router.get('/login', function(req, res) {
    res.render('login');
});

exports.routes = router;
