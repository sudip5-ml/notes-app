const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/auth')
const { validateCreateNote, validateUpdateNote } = require('../middleware/zodValidate')
const { getAllNotes, createNote, updateNote, deleteNote, bulkDeleteNotes } = require('../controllers/noteController')

// All note routes require authentication
router.use(authenticateToken)

router.get('/', getAllNotes)
router.post('/', validateCreateNote, createNote)
router.post('/bulk-delete', bulkDeleteNotes)
router.put('/:id', validateUpdateNote, updateNote)
router.delete('/:id', deleteNote)

module.exports = router
