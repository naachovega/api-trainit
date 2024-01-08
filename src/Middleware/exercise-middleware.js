import { routineRepository } from "../Repository/index.js";

async function validateRoutineId(req, res, next) {
  try {
    const { _id, routineId } = req.body;
    const id = _id || routineId;

    const routine = await routineRepository.find(id);

    if (!routine) {
      return res
        .json({
          message: "routine does not exist",
          code: 400,
        })
        .status(400);
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: `an unexpected error ocurred ${error.message}`,
    });
  }
}

export { validateRoutineId };
