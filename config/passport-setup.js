const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user-model')


// information to be placed in the cookie
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(currentUser => {
            if(currentUser) {
                console.log(`user exists: ${ currentUser }`)
                done(null, currentUser)
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.image.url
                }).save().then(newUser => {
                    console.log(`new user created: ${ newUser }`)
                    done(null, newUser)
                })
            }
        })
    })
)

