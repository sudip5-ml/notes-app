const jwt = require('jsonwebtoken')
const { sendError } = require('../utils/helpers')

const JWT_SECRET = process.env.JWT_SECRET || 'notes_app_jwt_secret_key_98765'

const authenticateToken = (req, res, next) => {
  const tokenFromCookie = req.cookies?.token
  const authHeader = req.headers['authorization']
  const tokenFromHeader = authHeader && authHeader.split(' ')[1]
  const token = tokenFromCookie || tokenFromHeader

  if (!token) {
    return sendError(res, 401, 'Access token required. Please log in.')
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return sendError(res, 403, 'Session expired or invalid token. Please log in again.')
    }
    req.user = user
    next()
  })
}

module.exports = authenticateToken
