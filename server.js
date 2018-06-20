const dotenv = require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const port = 3000
const app = express()
//set up view engine
app.set('view engine', 'ejs')

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://localhost/oauth-test', () => {
    console.log('Connected to mongodb')
})

// set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

// create home route
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Connected to port ${ port }`)
})
