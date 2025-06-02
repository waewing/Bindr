require("dotenv").config();
const express = require('express');
const cors = require("cors");
const mongoose = require("./config/db");
const OnePiece = require("./routes/OnePieceRoute");
const UserProfile = require("./routes/UserProfileRoute");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// MiddleWare
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? "https://bindr-evbw.onrender.com"
    : "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// API Routes - These should come BEFORE static file serving
app.use("/api", OnePiece);    // Add /api prefix
app.use("/api", UserProfile); // Add /api prefix

// Serve React Frontend - Only in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});