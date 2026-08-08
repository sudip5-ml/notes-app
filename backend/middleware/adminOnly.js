const User = require('../models/User')

// Runs AFTER authenticateToken, so req.user already exists (from the JWT).
// We re-check the role against the database rather than trusting the token's
// payload, in case a role was changed after the token was issued.
const adminOnly = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id
    if (!userId) {
      return res.status(401).json({ error: 'Access token required. Please log in.' })
    }

    const dbUser = await User.findById(userId)
    if (!dbUser || dbUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' })
    }

    req.adminUser = dbUser
    next()
  } catch (err) {
    console.error('adminOnly middleware error:', err)
    res.status(500).json({ error: 'Something went wrong verifying admin access.' })
  }
}

module.exports = adminOnly