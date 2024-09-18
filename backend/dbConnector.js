const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI; // Ensure this is set correctly in your .env file
console.log("Mongo URI:", uri); // Log the URI to check if it's loaded correctly

async function DbConnect() {
  try {
    await mongoose.connect(uri, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = { DbConnect };