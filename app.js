var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv()

var appRoutes = require('./routes/app');

var app = express();
//mongoose.connect('mongodb://localhost:27017/node-angular');
var mongoLabUrl = appEnv.getServiceURL('mongoservice');
if (mongoLabUrl == null) {
    //local or prod development
    mongoose.connect('mongodb://localhost:27017/node-angular');
} else {
    //cloud foundry
    mongoose.connect(mongoLabUrl);
}
// start the server on the given port and binding host, and print
// url to server when it starts
server.listen(appEnv.port, appEnv.bind, function() {
    console.log("server starting on " + appEnv.url)
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
