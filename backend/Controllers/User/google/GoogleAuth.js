const passport = require("passport");
const UserModel = require("../../../models/User/Auth.Schema");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}auth/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
  

      const Detail = profile._json;

      const findExistingUser = await UserModel.findOne({ email: Detail.email });
      if (findExistingUser) {
        if (findExistingUser?.emailVerified) {
          const updateEmailVerified = await UserModel.findByIdAndUpdate(
            findExistingUser?._id,
            { emailVerified: true },
            { new: true }
          );
        }
        const data = {
          message: "Login Successfully",
          user : findExistingUser,
          token: jwt.sign(
            {
              _id: findExistingUser._id,
              email: findExistingUser?.email,
              email_verified: findExistingUser?.emailVerified,
              user_name: findExistingUser?.user_name,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          ),
        };
        done(null, data);
      } else {
        let password = uuidv4();
        const CreateUser = await UserModel.create({
          email: Detail.email,
          user_name: Detail.email,
          password,
          emailVerified: Detail.email_verified,
        });
        const data = {
          message: "Signup and Login Successfully",
          token: jwt.sign(
            {
              _id: CreateUser._id,
              email: CreateUser?.email,
              email_verified: CreateUser?.verified,
              user_name: CreateUser?.user_name,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          ),
        };
        done(null, data);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (obj, done) {
  return done(null, obj);
});

module.exports = passport;
