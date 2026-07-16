require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp'

mongoose.connect(MONGO_URI)
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.log('Database connection failed!', err))

module.exports = mongoose
