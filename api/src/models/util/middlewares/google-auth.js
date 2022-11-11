const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://plataformaeventos-production.up.railway.app/users/login/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

/* http://localhost:3001 */
/* https://plataformaeventos-production-6111.up.railway.app */
/* https://plataformaeventos-production.up.railway.app */
