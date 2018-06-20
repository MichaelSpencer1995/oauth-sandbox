const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user-model')

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
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then(newUser => {
                    console.log(`new user created: ${ newUser }`)
                })
            }
        })
    })
)

