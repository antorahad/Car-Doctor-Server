// Config files
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const serviceCollection = client.db('carDoctorDB').collection('services');
const orderCollection = client.db('carDoctorDB').collection('order');

//Services API methods
app.get('/services', async (req, res) => {
  const cursor = serviceCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})

app.get('/services/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await serviceCollection.findOne(query);
  res.send(result);
})

// Booking API methods

// Default get
app.get('/', (req, res) => {
  res.send('Welcome to car doctor...')
})

app.listen(port, () => {
  console.log(`Car doctor listening on port ${port}`)
})