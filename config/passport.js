const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use('user-local', new LocalStrategy(
    {
        usernameField: "email"
    },
    function(email, password, done) {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            } else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));

passport.use('admin-local', new LocalStrategy(
    {
        usernameField: "email"
    },
    function(email, password, done) {
        db.Admin.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            } else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;