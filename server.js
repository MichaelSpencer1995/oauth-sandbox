const dotenv = require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const port = 3000

const app = express()
//set up view engine
app.set('view engine', 'ejs')

// set up routes
app.use('/auth', authRoutes)

// create home route
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Connect to port ${ port }`)
})
