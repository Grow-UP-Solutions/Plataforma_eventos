import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

passport.use(
  'auth-facebook',
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        'https://plataformaeventos-production-6111.up.railway.app/users/login/facebook/callback',
      profileFields: ['displayName', 'email', 'photos'],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
