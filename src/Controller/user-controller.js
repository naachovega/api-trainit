import { CustomError } from "../Models/Interfaces/Errors.js";
import { userRepository } from "../Repository/index.js";

async function AddRoutineToUser(userId, routineId) {
  try {
    const added = await userRepository.addRoutineId(userId, routineId);

    if (!added.acknowledged) {
      return new CustomError(
        "The routine couldnt be added to the user correctly.",
        400,
        "The routine couldnt be added to the user correctly."
      );
    }
  } catch (err) {
    return new CustomError(
      "An unexpected error ocurred.",
      500,
      "The routine couldnt be added to the user correctly."
    );
  }
}

export { AddRoutineToUser };
