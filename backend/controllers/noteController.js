const Note = require('../models/Note')
const { sendError } = require('../utils/helpers')

// Get all notes for the authenticated user
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user.id })
      .select('title content favorite is_trash tags isPinned created_at updated_at')
      .sort({ created_at: -1 })
    res.json(notes)
  } catch (err) {
    console.error('Error fetching notes:', err)
    return sendError(res, 500, 'Database error fetching notes.')
  }
}

// Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user_id: req.user.id })
    if (!note) {
      return sendError(res, 404, 'Note not found or access denied.')
    }
    res.json(note)
  } catch (err) {
    console.error('Error fetching note by ID:', err)
    return sendError(res, 500, 'Database error fetching note.')
  }
}

// Create a new note
const createNote = async (req, res) => {
  const { title, content, tags, isPinned } = req.body

  if (!title) {
    return sendError(res, 400, 'Note title is required.')
  }

  try {
    const newNote = await Note.create({
      title,
      content: content || '',
      user_id: req.user.id,
      favorite: false,
      is_trash: false,
      tags: tags || [],
      isPinned: !!isPinned
    })

    res.status(201).json(newNote)
  } catch (err) {
    console.error('Error inserting note:', err)
    return sendError(res, 500, 'Database error creating note.')
  }
}

// Update an existing note
const updateNote = async (req, res) => {
  const noteId = req.params.id
  const { title, content, favorite, is_trash, tags, isPinned } = req.body

  try {
    const note = await Note.findOne({ _id: noteId, user_id: req.user.id })

    if (!note) {
      return sendError(res, 404, 'Note not found or access denied.')
    }

    if (title !== undefined) note.title = title
    if (content !== undefined) note.content = content
    if (favorite !== undefined) note.favorite = !!favorite
    if (is_trash !== undefined) note.is_trash = !!is_trash
    if (tags !== undefined) note.tags = tags
    if (isPinned !== undefined) note.isPinned = !!isPinned

    const updatedNote = await note.save()
    res.json(updatedNote)
  } catch (err) {
    console.error('Error updating note:', err)
    return sendError(res, 500, 'Database error updating note.')
  }
}

// Delete a note permanently
const deleteNote = async (req, res) => {
  const noteId = req.params.id

  try {
    const result = await Note.deleteOne({ _id: noteId, user_id: req.user.id })

    if (result.deletedCount === 0) {
      return sendError(res, 404, 'Note not found or access denied.')
    }

    res.json({ message: 'Note deleted permanently.' })
  } catch (err) {
    console.error('Error deleting note:', err)
    return sendError(res, 500, 'Database error deleting note.')
  }
}

// Delete multiple notes permanently
const bulkDeleteNotes = async (req, res) => {
  const { ids } = req.body

  if (!ids || !Array.isArray(ids)) {
    return sendError(res, 400, 'Invalid request. An array of ids is required.')
  }

  try {
    const result = await Note.deleteMany({ _id: { $in: ids }, user_id: req.user.id })
    res.json({ message: `Successfully deleted ${result.deletedCount} notes.` })
  } catch (err) {
    console.error('Error bulk deleting notes:', err)
    return sendError(res, 500, 'Database error bulk deleting notes.')
  }
}

module.exports = { getAllNotes, createNote, updateNote, deleteNote, bulkDeleteNotes }
