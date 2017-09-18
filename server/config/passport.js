var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../db-models/user.js');

// Session.
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
    User.findById(_id, function(err, user) {
      done(err, user);
  });
});

// LOCAL STRATEGY.
passport.use('local-login', new LocalStrategy(function (username, password, done) {
  User.findOne({
    username: username
  })
    .exec(function(err, user) {
      console.log('Requested user: ', user)
      var invalid = { message: 'Invalid password.'};
      if (err) {
        done(err);
      }
      if (!user) {
        console.log('User not found, sorry.');
        return done(null, false, { message: 'Could not find this user.' });
      }
      if (!user.validatePassword(password)) {
        console.log('Invalid password!');
        return done(null, false, { message: 'Invalid password.' });
      } 
      return done(null, user);
    });
}));

module.exports = passport;