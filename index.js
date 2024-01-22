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
const bookingCollection = client.db('carDoctorDB').collection('bookings');

//Services API methods
app.get('/services', async (req, res) => {
  const result = await serviceCollection.find().toArray();
  res.send(result);
})

app.get('/services/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const options = {
      projection: { title: 1, price: 1, service_id: 1, img: 1 },
    };
  const result = await serviceCollection.findOne(query, options);
  res.send(result);
})

// Booking API methods

app.get('/bookings', async (req, res) => {
  console.log(req.query.email)
  let query = {};
  if(req.query?.email){
    query = {email: req.query.email}
  }
  const result = await bookingCollection.find(query).toArray();
  res.send(result);
})

app.post('/bookings', async (req, res) => {
  const booking = req.body;
  const result = await bookingCollection.insertOne(booking)
  res.send(result);
})

// Default get
app.get('/', (req, res) => {
  res.send('Welcome to car doctor...')
})

app.listen(port, () => {
  console.log(`Car doctor listening on port ${port}`)
})