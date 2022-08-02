const User = require("../database/models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "email", // not necessary, DEFAULT
  },
  function (email, password, done) {
    console.log("email", email);
    console.log("password", password);
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log("err in passport local strategy", err);
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect email address" });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    });
  }
);

module.exports = strategy;
