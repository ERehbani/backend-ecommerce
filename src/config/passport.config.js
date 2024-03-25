const passport = require("passport");
const local = require("passport-local");
const User = require("../dao/models/user.model");
const { createHash, isValidPassword } = require("../utils/hashBcrypt");
const GithubStrategy = require("passport-github2").Strategy;

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        try {
          let user = await User.findOne({ email: username });
        //   console.log(user);
          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            role: "User",
          };
          let result = await User.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al registrar el usuario" + error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.b87c6d37c083abda",
        clientSecret: "13e5e26363dad36e2ee946f358c5d72aa7660534",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken)
        try {
          console.log(profile);
          let user = await User.findOne({ email: profile.email });
          if (!user) {
            let newUser = {
              first_name: profile.username,
              last_name: profile.displayName,
              email: profile.email,
              password: "",
              age: 18,
              role: "user",
            };
            let result = await User.create(newUser);
            return done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializePassport;
