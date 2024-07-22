const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, 'goodreads.db')
let db = null

const initializeServerAndDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Running')
    })
  } catch (e) {
    console.log(`Error:${e.message}`)
    process.exit(1)
  }
}

app.get('/books/', async (request, response) => {
  const query = `SELECT * from book`
  const booksList = await db.all(query)
  response.send(booksList)
})

initializeServerAndDb()
