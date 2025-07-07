const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Person = require('./model/person'); // Ensure you have a Person model defined

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MongoDB URI is not defined in the environment variables');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json({ data: people });
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Default route to handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
