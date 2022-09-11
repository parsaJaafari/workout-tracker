const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path")

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// add route for client
app.use(express.static("../client/build"));
res.sendFile(
  path.join(__dirname + `${__dirname}/../client/build/index.html`)
);

// Connecting to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
