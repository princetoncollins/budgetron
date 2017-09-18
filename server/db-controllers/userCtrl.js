var User = require('../db-models/user.js');

module.exports = {

  addUser: function(req, res) {
    User.findOne({username: req.body.username})
    .exec(function(err, user) {
      console.log('REQUEST USER TO ADD:', user);     
      if (!user) {
        new User(req.body).save(function(err, user) {
          if (err) {
            console.log('There was an error', err);
            res.status(403).send(err);
          } else {
            console.log('Heres the user.', user);
            res.send(user);
          }
        });
      }
      if (user) {
        res.send('user exists');
      }
    });
  },

  // getUser: function(req, res) {
  //   console.log('Here is the req.body', req);
  //   console.log('Requested user: ', req.user);
  //   if (req.user) {
  //     res.status(200).send(req.user);
  //   } else {
  //     res.send('invalid');
  //   }
  // },


  getUser: function(req, res) {
      console.log('REQUESTED LOGIN USER: ', req.user, req.query.id);
      if (req.user) {
        console.log('Found user.');
        res.send(req.user);
      } else {
        res.send(false);
        console.log('Could not get user.', req.authInfo);
      }
  },

  logout: function(req, res) {
    req.logout();
  }

};