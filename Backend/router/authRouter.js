const express = require('express')
const router = express.Router()
const { registerController, loginController, verifyUserController, logoutController, verifyUser } = require('../controller/authController')

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/verify', verifyUser, verifyUserController)
router.get('/logout', logoutController)

module.exports = router