//libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors(
  {
    origin:["https://mern-stack-workout-managing-frontend.vercel.app", "https://mern-stack-workout-managing-backend.vercel.app"],
    methods : ["POST", "GET"],
    credentials: true
  }

));

//routes fetchers
const workoutRoutes = require('./routes/workouts.js')
app.use(express.json())

//middleware
app.use((req, res, next) => {
     console.log(req.path, req.method)
     next()
})

//routes
app.use("/api/workouts/", workoutRoutes)

//database connection
mongo_url = 'mongodb+srv://sahibzadaabdullah8:zF9dHnZdCapXkWpF@mernstack.6dh6a1c.mongodb.net/?retryWrites=true&w=majority&appName=mernstack'
mongoose.connect(mongo_url)
  .then(() => {
    //Server listening
    const port = process.env.PORT || 3000;
    app.listen(port , () => {
        console.log("Connected to db and server running on http://localhost:" + port);
    });


  }).catch((error) => {
    console.log(error)
  })

