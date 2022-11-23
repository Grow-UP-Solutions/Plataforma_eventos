const passport = require('passport');
const { Strategy } = require('passport-facebook');

passport.use(
  'auth-facebook',
  new Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'https://plataformaeventos-production-e0ed.up.railway.app/users/login/facebook/callback',
      profileFields: ['displayName', 'email', 'photos'],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

/* http://localhost:3001 */
/* https://plataformaeventos-production-e0ed.up.railway.app/ */
