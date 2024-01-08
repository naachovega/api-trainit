import express from "express";
import { CreateExercise } from "../Controller/index.js";
import { validateRoutineId } from "../Middleware/exercise-middleware.js";
import Exercise from "../Models/exercise.js";

const exerciseRouter = express.Router();

//add the exerciseid to the corresponding routine
exerciseRouter.post("/", validateRoutineId, async (req, res) => {
  const { name, description, desiredReps, desiredWeight, routineId } = req.body;

  const exercise = new Exercise(
    name,
    description,
    desiredReps,
    desiredWeight,
    routineId
  );

  const err = await CreateExercise(exercise);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(201).json({
    data: exercise,
  });
});

export default exerciseRouter;
