const { z } = require('zod')
const { sendError } = require('../utils/helpers')

const createNoteSchema = z.object({
  title: z.string().min(1, 'Note title is required.'),
  content: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
  isPinned: z.boolean().optional().default(false),
})

const updateNoteSchema = z.object({
  title: z.string().min(1, 'Note title must be at least 1 character.').optional(),
  content: z.string().optional(),
  favorite: z.boolean().optional(),
  is_trash: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  isPinned: z.boolean().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided to update.',
})

const validateCreateNote = (req, res, next) => {
  const result = createNoteSchema.safeParse(req.body)
  if (!result.success) {
    const errorMessage = result.error.errors.map(err => err.message).join(' ')
    return sendError(res, 400, errorMessage)
  }
  req.body = result.data
  next()
}

const validateUpdateNote = (req, res, next) => {
  const result = updateNoteSchema.safeParse(req.body)
  if (!result.success) {
    const errorMessage = result.error.errors.map(err => err.message).join(' ')
    return sendError(res, 400, errorMessage)
  }
  req.body = result.data
  next()
}

module.exports = { validateCreateNote, validateUpdateNote }
