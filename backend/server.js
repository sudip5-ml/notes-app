require('dotenv').config()
require('./middleware/config/db')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/noteRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running successfully!')
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/notes', noteRoutes)

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
