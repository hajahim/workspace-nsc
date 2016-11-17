
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const favicon = require('serve-favicon');
const logger = require('morgan');
const helmet = require('helmet');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.locals.pretty = true; // Essential to ensure the HTML is readeable
app.use(favicon(__dirname + '/app/images/favicon.ico'));

app.use(helmet());

// Log only 404 errors
app.use(logger('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

app.use(methodOverride());
// app.use(session({ resave: true,
//                   saveUninitialized: true,
//                   secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookie());
//app.use(multer());

app.use('/bower_components', express.static('./bower_components'));

app.use(express.static(path.join(__dirname, 'build')));

// development only
if ('development' == app.get('env')) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.sender('error', {
      message: err.message,
      error: err
    });
  });
}

require('./app/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  // console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
