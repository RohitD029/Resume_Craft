const express = require("express");
const app = express();
const connectDB = require("../BACKEND/config/db");
const cors = require("cors");

require("dotenv").config();

// ✅ CORS CONFIG
const corsOptions = {
  origin: "https://resume-craft-beryl.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ important

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://resume-craft-beryl.vercel.app",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

// DB
connectDB();

// Routes
const resumeRoutes = require("../BACKEND/routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);

const userRoutes = require("../BACKEND/routes/userRoutes");
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello Users Welcome to our Resume Craft");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});