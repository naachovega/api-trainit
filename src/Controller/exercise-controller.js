import { CustomError } from "../Models/Interfaces/Errors.js";
import { exerciseRepository } from "../Repository/index.js";

async function CreateExercise(exercise) {
  try {
    const created = await exerciseRepository.create(exercise);

    if (!created.acknowledged) {
      return new CustomError(
        "there was a problem saving the exercise",
        400,
        "there was a problem saving the exercise"
      );
    }
  } catch (err) {
    return new CustomError(
      `an unexpected error ocurred ${err.message}`,
      500,
      `an unexpected error ocurred ${err.message}`
    );
  }
}

async function GetAllExercises() {
  try {
    const exercises = await exerciseRepository.get();

    return { exercises: exercises, err: null };
  } catch (err) {
    return {
      exercises: null,
      err: new CustomError(
        `an unexpected error ocurred ${err.message}`,
        500,
        `an unexpected error ocurred ${err.message}`
      ),
    };
  }
}

async function GetExerciseById(id) {
  try {
    const exercise = await exerciseRepository.getById(id);

    return { exercise: exercise, err: null };
  } catch (err) {
    return {
      exercises: null,
      err: new CustomError(
        `an unexpected error ocurred ${err.message}`,
        500,
        `an unexpected error ocurred ${err.message}`
      ),
    };
  }
}

async function UpdateWeight(id, newWieght) {
  try {
    const updated = await exerciseRepository.updateWeights(id, newWieght);

    if (!updated.acknowledged) {
      return new CustomError(
        `the weight couldnt be updated properly. please try again later`,
        400,
        `the weight couldnt be updated properly. please try again later`
      );
    }

    const newExercise = await exerciseRepository.getById(id);

    return { newExercise: newExercise, err: null };
  } catch (err) {
    return {
      newExercise: null,
      err: new CustomError(
        `an unexpected error ocurred ${err.message}`,
        500,
        `an unexpected error ocurred ${err.message}`
      ),
    };
  }
}

async function UpdateSet(id, setNumber) {
  try {
    const updated = await exerciseRepository.updateSet(id, setNumber);

    if (!updated.acknowledged) {
      return new CustomError(
        `the set couldnt be updated properly. please try again later`,
        400,
        `the set couldnt be updated properly. please try again later`
      );
    }

    const newExercise = await exerciseRepository.getById(id);

    return { newExercise: newExercise, err: null };
  } catch (err) {
    return {
      newExercise: null,
      err: new CustomError(
        `an unexpected error ocurred ${err.message}`,
        500,
        `an unexpected error ocurred ${err.message}`
      ),
    };
  }
}

async function UpdateReps(id, reps) {
  try {
    const updated = await exerciseRepository.updateReps(id, reps);

    if (!updated.acknowledged) {
      return new CustomError(
        `the reps couldnt be updated properly. please try again later`,
        400,
        `the reps couldnt be updated properly. please try again later`
      );
    }

    const newExercise = await exerciseRepository.getById(id);

    return { newExercise: newExercise, err: null };
  } catch (err) {
    return {
      newExercise: null,
      err: new CustomError(
        `an unexpected error ocurred ${err.message}`,
        500,
        `an unexpected error ocurred ${err.message}`
      ),
    };
  }
}

export {
  CreateExercise,
  GetAllExercises,
  GetExerciseById,
  UpdateWeight,
  UpdateSet,
  UpdateReps,
};
