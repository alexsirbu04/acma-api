const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");
const config = require("../config/keys");

const socialOptions = {
  usernameField: "email"
};

const socialStrategy = new LocalStrategy(socialOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user);
  });
});

const localOptions = {
  usernameField: "email"
};

const localStrategy = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  });
});

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader("authorization")
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    console.log(payload);
    if (err) return done(err, false);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use("jwt", jwtStrategy);
passport.use("local", localStrategy);
passport.use("social", socialStrategy);
