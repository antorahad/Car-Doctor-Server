// Config files
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())


// DB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s9c9pgn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbConnection = () => {
  try {
    client.connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.log(error)
  }
}

dbConnection()
// Collection

// API methods

app.get('/', (req, res) => {
  res.send('Welcome to car doctor...')
})

app.listen(port, () => {
  console.log(`Car doctor listening on port ${port}`)
})