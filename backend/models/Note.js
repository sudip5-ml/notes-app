const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    default: ''
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favorite: {
    type: Boolean,
    default: false
  },
  is_trash: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  },
  isPinned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

// Ensure virtual fields (like .id) are serialized to JSON
noteSchema.set('toJSON', { virtuals: true })
noteSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Note', noteSchema)
