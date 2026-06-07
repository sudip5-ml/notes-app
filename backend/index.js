require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./db')

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || 'notes_app_jwt_secret_key_98765'

// Middleware
app.use(cors())
app.use(express.json())

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running successfully!')
})

// --- Middleware: JWT Authentication ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required. Please log in.' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Session expired or invalid token. Please log in again.' })
    }
    req.user = user
    next()
  })
}

// --- Auth Routes ---

// Signup Endpoint
app.post('/api/auth/signup', async (req, res) => {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'All fields (fullName, email, password) are required.' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' })
  }

  try {
    // Check if email already exists
    db.query('SELECT id FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Database query error on signup check:', err)
        return res.status(500).json({ error: 'Database error.' })
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'An account with this email already exists.' })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert new user (fullName maps to username column in db)
      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [fullName, email, hashedPassword],
        (err, results) => {
          if (err) {
            console.error('Database insert error on signup:', err)
            return res.status(500).json({ error: 'Error creating user account.' })
          }

          const userId = results.insertId
          const token = jwt.sign({ id: userId, email, username: fullName }, JWT_SECRET, {
            expiresIn: '24h',
          })

          res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: userId, username: fullName, email }
          })
        }
      )
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
})

// Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Database query error on login:', err)
      return res.status(500).json({ error: 'Database error.' })
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const user = results[0]

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, {
      expiresIn: '24h',
    })

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    })
  })
})

// --- Notes Routes (Protected by JWT) ---

// Get all notes for the authenticated user
app.get('/api/notes', authenticateToken, (req, res) => {
  db.query(
    'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id],
    (err, results) => {
      if (err) {
        console.error('Error fetching notes:', err)
        return res.status(500).json({ error: 'Database error fetching notes.' })
      }
      res.json(results)
    }
  )
})

// Create a new note
app.post('/api/notes', authenticateToken, (req, res) => {
  const { title, content } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Note title is required.' })
  }

  const noteContent = content || ''

  db.query(
    'INSERT INTO notes (title, content, user_id, favorite, is_trash) VALUES (?, ?, ?, 0, 0)',
    [title, noteContent, req.user.id],
    (err, results) => {
      if (err) {
        console.error('Error inserting note:', err)
        return res.status(500).json({ error: 'Database error creating note.' })
      }

      const noteId = results.insertId
      res.status(201).json({
        id: noteId,
        title,
        content: noteContent,
        user_id: req.user.id,
        favorite: 0,
        is_trash: 0,
        created_at: new Date()
      })
    }
  )
})

// Update an existing note (title, content, favorite, is_trash)
app.put('/api/notes/:id', authenticateToken, (req, res) => {
  const noteId = req.params.id
  const { title, content, favorite, is_trash } = req.body

  // Check if note exists and belongs to the user
  db.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [noteId, req.user.id], (err, results) => {
    if (err) {
      console.error('Error selecting note for update:', err)
      return res.status(500).json({ error: 'Database error.' })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Note not found or access denied.' })
    }

    const currentNote = results[0]

    // Determine updated values, fallback to current values if undefined
    const updatedTitle = title !== undefined ? title : currentNote.title
    const updatedContent = content !== undefined ? content : currentNote.content
    const updatedFavorite = favorite !== undefined ? (favorite ? 1 : 0) : currentNote.favorite
    const updatedIsTrash = is_trash !== undefined ? (is_trash ? 1 : 0) : currentNote.is_trash

    db.query(
      'UPDATE notes SET title = ?, content = ?, favorite = ?, is_trash = ? WHERE id = ? AND user_id = ?',
      [updatedTitle, updatedContent, updatedFavorite, updatedIsTrash, noteId, req.user.id],
      (err) => {
        if (err) {
          console.error('Error updating note:', err)
          return res.status(500).json({ error: 'Database error updating note.' })
        }

        res.json({
          id: parseInt(noteId),
          title: updatedTitle,
          content: updatedContent,
          favorite: !!updatedFavorite,
          is_trash: !!updatedIsTrash,
          user_id: req.user.id,
          created_at: currentNote.created_at
        })
      }
    )
  })
})

// Delete a note permanently
app.delete('/api/notes/:id', authenticateToken, (req, res) => {
  const noteId = req.params.id

  db.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, req.user.id], (err, results) => {
    if (err) {
      console.error('Error deleting note:', err)
      return res.status(500).json({ error: 'Database error deleting note.' })
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Note not found or access denied.' })
    }

    res.json({ message: 'Note deleted permanently.' })
  })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})