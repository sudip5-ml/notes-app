const express = require('express')
const rateLimit = require('express-rate-limit')
const router = express.Router()
const { signup, login, forgotPassword, logout } = require('../controllers/authController')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again later.' },
})

router.post('/signup', signup)
router.post('/login', loginLimiter, login)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)

module.exports = router
