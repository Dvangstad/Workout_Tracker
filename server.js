const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const {Workout} = require("./models");

const app =  express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {useNewUrlParser: true});
//routing stuff
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"))
})

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"))
})

app.get("/api/workouts", (req, res) => {
    Workout.find({}).then(data => res.json(data))
})

app.post("/api/workouts", (req, res) => {
    Workout.create({}).then(newWorkout => res.json(newWorkout))
})

app.put("/api/workouts/:id", (req, res) => {
    let objId = req.params.id;

    Workout.findOneAndUpdate(
        {_id: objId},
        {
            $push: {exercises: req.body}
        }
    ).then(updated => res.send(updated))
})

app.get("/api/workouts/range", (req, res) => {
    Workout.find({}).then(data => res.json(data))
})

app.listen(PORT, () => {
    console.log("living")
})