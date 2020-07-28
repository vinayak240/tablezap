const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

const app = express();

console.log("\n<>=================================<>");

// Connect Database
connectDB();

// CORS Middleware
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/users", require("./routes/api/user"));
app.use("/restaurants", require("./routes/api/restaurant"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
