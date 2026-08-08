const express = require('express')
const router = express.Router()

const authenticateToken = require('../middleware/auth')
const adminOnly = require('../middleware/adminOnly')
const {
  getStats,
  getUsers,
  getNotes,
  updateUserRole,
  deleteUser,
  deleteNote,
  getAuditLog,
} = require('../controllers/adminController')

// Every route below requires a valid login AND an admin role
router.use(authenticateToken, adminOnly)

router.get('/stats', getStats)
router.get('/users', getUsers)
router.get('/notes', getNotes)
router.get('/audit-log', getAuditLog)
router.patch('/users/:id', updateUserRole)
router.delete('/users/:id', deleteUser)
router.delete('/notes/:id', deleteNote)

module.exports = router