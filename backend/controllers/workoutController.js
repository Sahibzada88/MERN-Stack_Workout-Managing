const workoutModel = require("../models/WorkoutModel.js")
const mongoose = require("mongoose")
const getWorkouts = async (req, res) => {
    const workouts = await workoutModel.find({}).sort({createdat : -1})
    res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such workout"})
    }

    const workouts = await workoutModel.findById(id);
    if (!workouts) {
        return res.status(404).json({error : "No such workout"})
    }

    res.status(200).json(workouts)
}

const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;
    
    let emptyField = []
    if (!title) {
        emptyField.push("title")
    }
    if (!load) {
        emptyField.push("load")
    }
    if (!reps) {
        emptyField.push("reps")
    }
    if (emptyField.length > 0) {
        return res.status(400).json({error : "Please fill all the fiekds", emptyField})
    }


    try {
      const workout = await workoutModel.create({title, load, reps})
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({error : error.message})
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such workout"})
    }

    const workouts = await workoutModel.findOneAndDelete({_id : id});
    if (!workouts) {
        return res.status(404).json({error : "No such workout"})
    }

    res.status(200).json(workouts)
}


const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such workout"})
    }

    const workouts = await workoutModel.findOneAndUpdate({_id : id}, {
        ...req.body
    });
    if (!workouts) {
        return res.status(404).json({error : "No such workout"})
    }

    res.status(200).json(workouts)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}