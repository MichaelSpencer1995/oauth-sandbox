const router = require('express').Router()

const authCheck = (req, res, next) => {
    // redirects to login page if the browser doesn't have a cookie
    if(!req.user) {
        res.redirect('/auth/login')
    } else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user })
})

module.exports = router