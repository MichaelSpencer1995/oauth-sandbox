const dotenv = require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')

const port = 3000
const app = express()
//set up view engine
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/oauth-test', () => {
    console.log('Connected to mongodb')
})

// set up routes
app.use('/auth', authRoutes)

// create home route
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Connected to port ${ port }`)
})
