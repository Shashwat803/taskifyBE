const express = require('express')
const { registerUser, loginUser, currentUser, message } = require('../controllers/UserControllers')
const validateUser = require('../middleware/validateTokenHandler')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/currentUser', validateUser, currentUser)
router.get('/message',  message)
module.exports = router