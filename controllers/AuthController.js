const User = require("../models/User");
const jwt = require("jwt-simple");
const config = require("../config/keys");

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    config.secret
  );
}

exports.Register = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var picture = req.body.picture || "";
  var role = req.body.role;
  var hotel = "";

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) return next(err);
    if (existingUser) return res.status(422).json({ error: "Email taken" });
    var user = new User({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      picture: picture,
      role: role,
      hotel: hotel
    });
    user.save(function(err) {
      if (err) return next(err);
      res.json({ user_id: user._id, token: tokenForUser(user) });
    });
  });
};

exports.Login = function(req, res, next) {
  var user = req.user;
  User.findOne({ email: user.email }, function(err, existingUser) {
    if (err) return next(err);
    if (existingUser) {
      res.send({
        user: existingUser,
        token: tokenForUser(user)
      });
    }
  });
};
