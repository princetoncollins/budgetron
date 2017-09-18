var express = require('express');
var userCtrl = require('./db-controllers/userCtrl.js');
var passport = require('./config/passport.js');
var app = express.Router();

app.post('/signup', userCtrl.addUser); //This makes a new user.
app.get('/getUser', userCtrl.getUser);
// app.get('/getCurrentUser', userCtrl.getCurrentUser);

// Login.
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/api/getUser',
  failureRedirect: '/api/getUser'
}));

// Logout.
app.get('/logout', function(req, res, next) {
  req.logout();
  res.status(200).send("Logged out.");
});

module.exports = app;

	
	