const jwt = require('jsonwebtoken')
const { sendError } = require('../utils/helpers')

if (!process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is missing.')
}
const JWT_SECRET = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
 
  const authHeader = req.headers['authorization']
const token = req.cookies?.token || (authHeader && authHeader.split(' ')[1])


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
