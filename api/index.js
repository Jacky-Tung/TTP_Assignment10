const express = require('express')
const router = express.Router()

router.use('/guests', require('./guests'))
router.use('/housekeeper', require('./housekeeper'))
router.use('/reservations', require('./reservations'))
router.use('/rooms', require('./rooms'))
router.use('/join', require('./join'))

router.use((req,res,next) =>{
    next();
})

module.exports = router