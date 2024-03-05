const passport = require("../google/GoogleAuth")

const GoogleAPI = async (req, res) => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
          passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            console.log("hii i m here ")
        //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        //   });
        }
      )
    );
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GoogleAPI;
