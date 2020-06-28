const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
//Tell passport to use google strategy
passport.use(new googleStrategy(
    {
      clientID:"1061395644808-dqil3o961vg36l93tntuopschi042mb6.apps.googleusercontent.com",
      clientSecret: "tfEKXNXWgNo9XEvbRlOmZYsk",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //Find user in database 
      User.findOne({ email: profile.emails[0].value })
      .exec(function(err,user){
        if (err) {
          console.log("error in google Strategy passport", err);
          return;
        }
        console.log(profile);
        //if found set it as req.user
        if (user) {
          return done(null, user);
        } else {
          // else create new user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in creating user", err);
                return;
              }
              return done(null,user);
            }
          );
        }
      });
    }
  )
);
