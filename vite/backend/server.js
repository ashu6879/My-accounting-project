require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const Counter = require('./models/counter'); // Import the Counter model

const app = express();

// Function to initialize counters
const initializeCounters = async () => {
  try {
    // Define initial values for each counter
    const counters = [
      { _id: 'clientCategory', initial_value: 77 },
      { _id: 'projectCategory', initial_value: 74 },
      { _id: 'projectID', initial_value: 134 },
      { _id: 'clientID', initial_value: 118 },
      { _id: 'invID', initial_value: 288 },  // Added for invID initialization
      { _id: 'invNum', initial_value: 12312300194 },  // Added for invNum initialization
      { _id: 'invtID', initial_value: 1065 }  // Added for invtID initialization
    ];

    // Loop through each counter definition
    for (const { _id, initial_value } of counters) {
      const counter = await Counter.findById(_id);
      if (!counter) {
        await Counter.create({ _id, sequence_value: initial_value });
        console.log(`Counter for ${_id} initialized to start from ${initial_value}.`);
      } else {
        console.log(`Counter for ${_id} already initialized.`);
      }
    }
  } catch (err) {
    console.error('Error initializing counters:', err);
  }
};

// Connect to MongoDB
connectDB().then(async () => {
  // Initialize the counters after successful database connection
  await initializeCounters();

  // Start the server after initializing the counters
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Configure CORS
const corsOptions = {
  origin: 'https://admin-ekarigar.vercel.app/', // Adjust this as needed for security
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

module.exports = app;
