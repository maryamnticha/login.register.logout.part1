const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const config = require("config");

const User = require("../models/user");

const secretOrKey = config.get("secretOrKey");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey
};

passport.initialize();
console.log("hello");
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const searchRes = await User.findById(jwt_payload.id);
      searchRes ? done(null, searchRes) : done(null, false);
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
