import express from "express";
import {
  CreateExercise,
  GetAllExercises,
  GetExerciseById,
  UpdateWeight,
} from "../Controller/index.js";
import {
  validateRoutineId,
  validateExerciseId,
} from "../Middleware/exercise-middleware.js";
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

exerciseRouter.get("/", async (req, res) => {
  const { exercises, err } = await GetAllExercises();

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: exercises,
  });
});

exerciseRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { exercise, err } = await GetExerciseById(id);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  if (!exercise) {
    return res.status(404).json({
      message: "no exercise found",
    });
  }

  return res.status(200).json({
    data: exercise,
  });
});

exerciseRouter.patch("/:id", validateExerciseId, async (req, res) => {
  const { id } = req.params;
  const { newWeight } = req.body;

  const { newExercise, err } = await UpdateWeight(id, newWeight);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: newExercise,
  });
});

export default exerciseRouter;
