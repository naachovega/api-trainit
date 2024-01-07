import express from "express";
import { Create, GetAll, Get } from "../Controller/index.js";
import { userExistByIdMiddleware } from "../Middleware/user-middleware.js";
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

  const err = await Create(routine);

  if (err) {
    return res.status(err.code).json({
      data: err.message,
    });
  }

  res.status(201).json({
    data: routine,
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

export default routineRouter;
