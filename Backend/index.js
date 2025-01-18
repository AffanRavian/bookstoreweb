import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import bookroute from './route/book.route.js';
import userroute from './route/user.route.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDbURI;

app.use(cors({
    origin: ['http://localhost:4001', 'http://localhost:5173']
  }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(URI) // Added connection options for compatibility
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use('/book', bookroute);
app.use('/user', userroute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
