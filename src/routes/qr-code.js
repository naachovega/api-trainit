import express from "express";
import { Scan } from "../Controller/index.js";
import { userExistIdParam } from "../Middleware/index.js";

const qrRouter = express.Router();

qrRouter.patch("/:id", userExistIdParam, async (req, res) => {
  const { id } = req.params;

  const { err, newWeeklyAttendance, newMonthlyAttendance } = await Scan(id);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  const data = {
    id: id,
    weeklyAttendance: newWeeklyAttendance,
    monthlyAttendance: newMonthlyAttendance,
  };

  return res.status(200).json({
    data: data,
  });
});

export default qrRouter;
