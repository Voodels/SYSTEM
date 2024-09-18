require('dotenv').config(); // Ensure this is at the top
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRouter = require("./routes/taskRouter");
const { DbConnect } = require("./dbConnector");

const server = express();
server.use(cors()).use(bodyParser.json());

const corsOptions = {
  origin: 'https://system-ten-pink.vercel.app/', // Change this to your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials if needed
};


// Middleware to log requests
server.use((req, res, next) => {
    console.log(`Received request for: ${req.method} ${req.url}`);
    next(); // Call next() to pass control to the next middleware or route handler
});

// Define the root route correctly
server.get("/", (req, res) => {
    res.send('<h1>HOME</h1>'); // Ensure this is correctly defined
});

server.use("/", taskRouter);
DbConnect();

const PORT = 8001; // Use the port from .env or default to 8001
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});