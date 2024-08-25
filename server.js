const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bfhlRoutes = require('./routes/bfhlRoutes');
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api', bfhlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
