const express = require('express')
const { registerUser, loginUser, currentUser } = require('../controllers/UserControllers')
const validateUser = require('../middleware/validateTokenHandler')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/currentUser', validateUser, currentUser)

module.exports = router