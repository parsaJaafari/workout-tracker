const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// get all workouts

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(201).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout Not Found" });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.find({ user_id }).findById(id);

    if (!workout) {
      return res.status(400).json({ error: "Workout Not Found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// create a new workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update a workout
const updateWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout Not Found" });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(id, {
      title,
      reps,
      load,
    });
    if (!workout) {
      return res.status(400).json({ error: "Workout Not Found" });
    }

    res.status(204).json({});
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout Not Found" });
  }
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(400).json({ error: "Workout Not Found" });
    }
    res.status(202).json(workout);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
