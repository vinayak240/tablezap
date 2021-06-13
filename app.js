const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Connect Database
connectDB();

// CORS Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());

// Define Routes
app.use("/users", require("./routes/api/user"));
app.use("/restaurants", require("./routes/api/restaurant"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
