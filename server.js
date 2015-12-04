
// https://devcenter.heroku.com/articles/mongolab
// http://todomvc.com/examples/angularjs/#/
var express  = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser');


var http = require('http');
  


/************* Start Mongoose Stuff *******************/
var mongoose = require('mongoose');
var PostsModel = require('./models/Posts');
var CommentsModel = require('./models/Comments');
var UsersModel = require('./models/Users');
var ProjectsModel = require('./models/Projects');
var InvitesModel = require('./models/Invites');
/*
 * I’m sharing my credential here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * MONGOLAB_URI=mongodb://example:example@ds053312.mongolab.com:53312/todolist
 * 'mongodb://example:example@ds053312.mongolab.com:53312/todolist'
 */
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/econnect', function (error) {
    if (error) console.error(error);
    else console.log('mongo connected to: ' + process.env.MONGOLAB_URI);
});




// For User PW Authentication and Security
//var crypto = require('crypto');
var jwt = require('jsonwebtoken'),
    passport = require('passport'),
    passportConfig = require('./config/passport');



var app = express();

app.set('view engine', 'ejs');
// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, 'public')));

app.use('/scripts', express.static(__dirname + '/node_modules/'));
//app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.listen(process.env.PORT || 5000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require('./routes/index');
app.use('/', routes);
app.use(passport.initialize());



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
