// Dependencies.
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var morgan = require('morgan');
var app = express();

// Authentication files.
var config = require('./config/config.js');
var routes = require('./routes');
var passport = require('./config/passport.js');
var userCtrl = require('./db-controllers/userCtrl.js');

var port = config.port;


app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public/"));
app.use(express.static(__dirname + "/../public/app/"));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

// Passport.
app.use(session({
	secret: config.secret,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes.
app.use('/api', routes);

// Connect to Database.
var mongoUri = config.mongoUri;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri); 

mongoose.connection.on('connected', function(){
  console.log('Successfully connected to MongoDB.');
});

mongoose.connection.on('error', function(){
  console.log('Error connecting to MongoDB.');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongo default connection disconnected through app termination.'); 
    process.exit(0); 
  }); 
}); 

app.listen(port, function() {
  console.log('Listening on port: ', port);
});