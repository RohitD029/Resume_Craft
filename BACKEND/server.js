const express = require("express");
const app = express();//app is like blueprint instance for server creation
const connectDB = require("./config/db");

require("dotenv").config();

//Middleware
app.use(express.json());

//connect to MongoDB
connectDB();

//import resume routes
const resumeRoutes = require('./routes/resumeRoutes');
app.use('/api/resume', resumeRoutes); 

app.get('/',(req, res) => {
  res.send('Hello Users Welcome to our Resume Craft')
})

const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});
