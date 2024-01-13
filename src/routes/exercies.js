import express from "express";
import {
  CreateExercise,
  GetAllExercises,
  GetExerciseById,
  UpdateWeight,
  UpdateSet,
  UpdateReps,
  DeleteExercise,
  FinishExercise,
  Update,
  AddExercisesToRoutine,
  GetByRoutineId,
} from "../Controller/index.js";
import {
  validateRoutineId,
  validateExerciseId,
} from "../Middleware/exercise-middleware.js";
import Exercise from "../Models/exercise.js";

const exerciseRouter = express.Router();

//add the exerciseid to the corresponding routine
exerciseRouter.post("/", validateRoutineId, async (req, res) => {
  const {
    name,
    description,
    desiredReps,
    desiredSet,
    desiredWeight,
    restTime,
    routineId,
  } = req.body;

  const exercise = new Exercise(
    name,
    description,
    desiredReps,
    desiredSet,
    desiredWeight,
    restTime,
    routineId
  );

  const err = await CreateExercise(exercise);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  const exercises = [exercise._id];
  let message;

  if (exercises != "") {
    let { errAddingExercise } = await AddExercisesToRoutine(
      routineId,
      exercises
    );
    if (err) {
      message = errAddingExercise.message;
    }
  }

  return res.status(201).json({
    data: exercise,
    message: message,
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

exerciseRouter.patch("/weight/:id", validateExerciseId, async (req, res) => {
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

exerciseRouter.patch("/reps/:id", validateExerciseId, async (req, res) => {
  const { id } = req.params;
  const { repNumber } = req.body;

  const { newExercise, err } = await UpdateReps(id, repNumber);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: newExercise,
  });
});

exerciseRouter.patch("/set/:id", validateExerciseId, async (req, res) => {
  const { id } = req.params;
  const { setNumber } = req.body;

  const { newExercise, err } = await UpdateSet(id, setNumber);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: newExercise,
  });
});

exerciseRouter.delete("/:id", validateExerciseId, async (req, res) => {
  const { id } = req.params;

  const err = await DeleteExercise(id);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(204).json({});
});

exerciseRouter.patch(
  "/finish-exercise/:id",
  validateExerciseId,
  async (req, res) => {
    const { id } = req.params;

    const err = await FinishExercise(id);

    if (err) {
      return res.status(err.code).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      data: "the exercise was completed!",
    });
  }
);

exerciseRouter.patch("/:id", validateExerciseId, async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    desiredReps,
    desiredSet,
    desiredWeight,
    restTime,
  } = req.body;

  const { newExercise, err } = await Update(
    id,
    name,
    description,
    desiredReps,
    desiredSet,
    desiredWeight,
    restTime
  );

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  res.status(200).json({
    data: { newExercise },
  });
});

exerciseRouter.get("/routine/:id", validateRoutineId, async (req, res) => {
  const { id } = req.params;

  const { exercises, err } = await GetByRoutineId(id);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: exercises,
  });
});

export default exerciseRouter;
