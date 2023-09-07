const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET


module.exports = ()=>{
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:8080/auth/google/callback",
                passReqToCallback: true
            },
            function (request, accessToken, refreshToken, profile, done) {
                console.log(profile);
                console.log(accessToken);
    
                return done(null, profile);
            }
        )
        
    );
}