const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose");
const authRoute = require('./routes/auth.js')
const jobRoute = require('./routes/job.js')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/job",jobRoute)


// app.use("*", (req, res) => {
//     res.status(404).json({ errorMessage: "Route not found!" });
// });

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});


const port = process.env.PORT || 3000



app.get('/api/health', (req, res) => {
    console.log('Server is up... :)')
    res.json({ 
        service: 'Backend Joblisting Server',
        status:'ACTIVE',
        time:new Date() 
})
})

app.listen(port, () => {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log(`Server is up on ${process.env.PORT} :)`))
      .catch((error) => console.log(error));
  });
  