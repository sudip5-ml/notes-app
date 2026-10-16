const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { sendError } = require('../utils/helpers')

if (!process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is missing.')
}
const JWT_SECRET = process.env.JWT_SECRET
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}

// Signup
const signup = async (req, res) => {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password) {
    return sendError(res, 400, 'All fields (fullName, email, password) are required.')
  }

  if (password.length < 6) {
    return sendError(res, 400, 'Password must be at least 6 characters long.')
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return sendError(res, 400, 'An account with this email already exists.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username: fullName,
      email: email.toLowerCase(),
      password: hashedPassword
    })

    const token = jwt.sign({ id: newUser.id, email: newUser.email, username: newUser.username }, JWT_SECRET, {
      expiresIn: '24h',
    })

    res.cookie('token', token, cookieOptions)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    })
  } catch (error) {
    console.error('Signup error:', error)
    sendError(res, 500, 'Internal server error.')
  }
}

// Login
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return sendError(res, 400, 'Email and password are required.')
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return sendError(res, 401, 'Invalid email or password.')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return sendError(res, 401, 'Invalid email or password.')
    }

    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, {
      expiresIn: '24h',
    })

    res.cookie('token', token, cookieOptions)

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    })
  } catch (error) {
    console.error('Database query error on login:', error)
    sendError(res, 500, 'Database error.')
  }
}

const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })
  res.json({ message: 'Logged out successfully.' })
}

// Forgot Password (placeholder — validates email exists)
const forgotPassword = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return sendError(res, 400, 'Email address is required.')
  }

  try {
    await User.findOne({ email: email.toLowerCase() })
    // Always return success to avoid leaking whether email exists
    res.json({ message: 'If an account with that email exists, a reset link has been sent.' })
  } catch (error) {
    console.error('Database query error on forgot-password:', error)
    return sendError(res, 500, 'Database error.')
  }
}

module.exports = { signup, login, logout, forgotPassword }
