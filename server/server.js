require("dotenv").config();
const express = require('express');
const cors = require("cors");
const mongoose = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});