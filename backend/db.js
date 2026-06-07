require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) {
    console.log('Database connection failed!', err)
  } else {
    console.log('Database connected successfully!')
    
    // Automatically migrate columns if missing
    db.query("SHOW COLUMNS FROM notes LIKE 'favorite'", (err, results) => {
      if (!err && results.length === 0) {
        db.query("ALTER TABLE notes ADD COLUMN favorite TINYINT(1) DEFAULT 0", (err) => {
          if (!err) console.log("Added column 'favorite' to table 'notes'")
        })
      }
    })

    db.query("SHOW COLUMNS FROM notes LIKE 'is_trash'", (err, results) => {
      if (!err && results.length === 0) {
        db.query("ALTER TABLE notes ADD COLUMN is_trash TINYINT(1) DEFAULT 0", (err) => {
          if (!err) console.log("Added column 'is_trash' to table 'notes'")
        })
      }
    })
  }
})

module.exports = db