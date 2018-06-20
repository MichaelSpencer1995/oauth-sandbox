const router = require('express').Router()

router.get('/', (req, res) => {
    res.send(`You are logged in as: ${ req.user.username }`)
})

module.exports = router