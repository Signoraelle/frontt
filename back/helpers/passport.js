const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true
    },
    function (email, password, done) {
      console.log("email=" + email);
      console.log("password=" + password);
      connection.query(
        "SELECT * FROM users WHERE email = ?",

        [email],
        async function (err, results) {
          if (err) {
            return done(err + "I am here");
          }
          if (!results[0]) {
            console.log("incorrect email");
            return done(null, false, { message: "Incorrect email." });
          }

          const validPassword = await bcrypt.compare(
            password,
            results[0].password
          );

          if (!validPassword) {
            console.log("invalid password");
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, results[0]);
        }
      );
    }
  )
);
module.exports = passport;