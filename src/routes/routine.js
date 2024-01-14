import express from "express";
import {
  Create,
  GetAll,
  Get,
  GetByUserId,
  AddRoutineToUser,
  AddExercisesToRoutine,
  UpdateRotuineInfo,
  RemoveRoutineId,
} from "../Controller/index.js";
import {
  userExistByIdMiddleware,
  validateRoutineId,
} from "../Middleware/index.js";
import Routine from "../Models/routine.js";

const routineRouter = express.Router();

//validate fields are not empty
routineRouter.post("/", userExistByIdMiddleware, async (req, res) => {
  const { name, description, userId, dateString, day, month, year } = req.body;

  const routine = new Routine(
    name,
    description,
    userId,
    dateString,
    day,
    month,
    year
  );

  let err = await Create(routine);

  if (err) {
    return res.status(err.code).json({
      data: err.message,
    });
  }

  err = await AddRoutineToUser(userId, routine._id);
  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  const { exercises } = req.body;
  let message;

  if (exercises != "") {
    let { addedCount, errAddingExercise } = await AddExercisesToRoutine(
      routine._id,
      exercises
    );
    if (err) {
      message = errAddingExercise.message;
    }
    if (addedCount > 0) {
      routine.exercises = exercises;
    }
  }

  return res.status(201).json({
    data: routine,
    message: message,
  });
});

routineRouter.get("/", async (req, res) => {
  const { routines, err } = await GetAll();

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: routines,
  });
});

routineRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { routine, err } = await Get(id);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  if (!routine) {
    return res.status(404).json({
      data: "routine not found",
    });
  }

  return res.status(200).json({
    data: routine,
  });
});

routineRouter.get("/byUserId/:userId", async (req, res) => {
  const { userId } = req.params;

  const { routines, err } = await GetByUserId(userId);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  if (routines.length === 0) {
    return res.status(404).json({
      data: "no routines found for the user sent",
    });
  }

  return res.status(200).json({
    data: routines,
  });
});

routineRouter.patch("/:id", validateRoutineId, async (req, res) => {
  const { id } = req.params;
  const { name, description, userId, dateString, day, month, year, coachId } =
    req.body;

  const { routine, err } = await UpdateRotuineInfo(
    id,
    name,
    description,
    userId,
    dateString,
    day,
    month,
    year
  );

  if (err) {
    return res.status(err.code).json({
      message: err.messgae,
    });
  }

  if (userId) {
    //guardar el id de la rutina en el del nuevo user y borrar en el anterior

    const errSaving = await AddRoutineToUser(userId, id);

    if (errSaving) {
      return res.status(err.code).json({
        message: err.message,
      });
    }

    // despues borrarlo del original desde coachId
    const errDeleting = await RemoveRoutineId(coachId, id);
    if (errDeleting) {
      return res.status(err.code).json({
        message: err.message,
      });
    }
  }

  return res.status(200).json({
    data: routine,
  });
});

export default routineRouter;
