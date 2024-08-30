require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/index');

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS
const corsOptions = {
  origin: '*', // Adjust this as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Use unified routes
app.use('/', routes);

// Handle 404 errors for unhandled routes
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
