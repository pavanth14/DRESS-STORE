const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes'); // Import product routes

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit if connection fails
  }
};

// Middleware

app.use(cors());
app.use(express.json()); // Middleware for parsing JSON


// Disable pretty-printing for JSON responses
app.set('json spaces', 0); // Force single-line JSON output

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the DressStore application.' });
});

// Use the product routes
app.use('/api/products', productRoutes); // Include product routes

// Start the server and connect to the database
const startServer = async () => {
  await connectToDatabase(); // Connect to the database
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
