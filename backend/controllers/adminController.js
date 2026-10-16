const User = require('../models/User')
const Note = require('../models/Note')
const AuditLog = require('../models/AuditLog')

// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const [totalUsers, totalNotes, newUsersThisWeek] = await Promise.all([
      User.countDocuments(),
      Note.countDocuments(),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    ])

    res.json({ totalUsers, totalNotes, newUsersThisWeek })
  } catch (err) {
    console.error('getStats error:', err)
    res.status(500).json({ error: 'Failed to load stats.' })
  }
}

// GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt')
    const shaped = users.map((u) => ({
      id: u._id,
      full_name: u.username,
      email: u.email,
      role: u.role,
      created_at: u.createdAt,
    }))
    res.json(shaped)
  } catch (err) {
    console.error('getUsers error:', err)
    res.status(500).json({ error: 'Failed to load users.' })
  }
}

// GET /api/admin/notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('user_id', 'username email').sort('-created_at')
    const shaped = notes.map((n) => ({
      id: n._id,
      title: n.title,
      content: n.content,
      owner_name: n.user_id?.username || null,
      owner_email: n.user_id?.email || 'Deleted user',
      created_at: n.created_at,
    }))
    res.json(shaped)
  } catch (err) {
    console.error('getNotes error:', err)
    res.status(500).json({ error: 'Failed to load notes.' })
  }
}

// PATCH /api/admin/users/:id
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: "Role must be 'user' or 'admin'." })
    }

    const before = await User.findById(req.params.id)
    if (!before) {
      return res.status(404).json({ error: 'User not found.' })
    }

    // Guard: don't let an admin demote/change their own role through the panel
    if (String(req.adminUser._id) === String(req.params.id)) {
      return res.status(400).json({ error: "You can't change your own role from here." })
    }

    // No-op: role isn't actually changing, so skip writing a log entry
    if (before.role === role) {
      return res.json({
        id: before._id,
        full_name: before.username,
        email: before.email,
        role: before.role,
        created_at: before.createdAt,
      })
    }

    const updated = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password')

    await AuditLog.create({
      action: 'role_change',
      performedBy: req.adminUser._id,
      targetUser: updated._id,
      previousRole: before.role,
      newRole: updated.role,
    })

    res.json({
      id: updated._id,
      full_name: updated.username,
      email: updated.email,
      role: updated.role,
      created_at: updated.createdAt,
    })
  } catch (err) {
    console.error('updateUserRole error:', err)
    res.status(500).json({ error: 'Failed to update role.' })
  }
}

// GET /api/admin/audit-log
const getAuditLog = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate('performedBy', 'username email')
      .populate('targetUser', 'username email')
      .sort('-created_at')
      .limit(200)

    const shaped = logs.map((l) => ({
      id: l._id,
      action: l.action,
      performed_by_name: l.performedBy?.username || 'Deleted admin',
      performed_by_email: l.performedBy?.email || null,
      target_user_name: l.targetUser?.username || 'Deleted user',
      target_user_email: l.targetUser?.email || null,
      previous_role: l.previousRole,
      new_role: l.newRole,
      created_at: l.created_at,
    }))

    res.json(shaped)
  } catch (err) {
    console.error('getAuditLog error:', err)
    res.status(500).json({ error: 'Failed to load audit log.' })
  }
}

// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Guard: don't let an admin delete their own account through this panel
    if (String(req.adminUser._id) === String(id)) {
      return res.status(400).json({ error: "You can't delete your own account from here." })
    }

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    await Note.deleteMany({ user_id: id })
    await User.findByIdAndDelete(id)

    res.json({ message: 'User and their notes were deleted.' })
  } catch (err) {
    console.error('deleteUser error:', err)
    res.status(500).json({ error: 'Failed to delete user.' })
  }
}

// DELETE /api/admin/notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' })
    }
    res.json({ message: 'Note deleted.' })
  } catch (err) {
    console.error('deleteNote error:', err)
    res.status(500).json({ error: 'Failed to delete note.' })
  }
}

module.exports = {
  getStats,
  getUsers,
  getNotes,
  updateUserRole,
  deleteUser,
  deleteNote,
  getAuditLog,
}