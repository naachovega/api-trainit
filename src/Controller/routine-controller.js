import { CustomError } from "../Models/Interfaces/Errors.js";
import { routineRepository } from "../Repository/index.js";

async function Create(routine) {
  try {
    const created = await routineRepository.create(routine);

    if (!created.insertedId) {
      return new CustomError(
        "the routine couldnt be created properly",
        400,
        "the routine couldnt be created properly"
      );
    }
  } catch (err) {
    return new CustomError(
      `an unexpected error ocurred: ${err.message}`,
      500,
      "an unexpected error ocurred"
    );
  }
}

async function GetAll() {
  try {
    const routines = await routineRepository.findAll();

    return { routines: routines, err: null };
  } catch (err) {
    return {
      routines: null,
      err: new CustomError(
        `an unexpected error ocurred: ${err.message}`,
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}

async function Get(id) {
  try {
    const routine = await routineRepository.find(id);

    return { routine: routine, err: null };
  } catch (err) {
    return {
      routine: null,
      err: new CustomError(
        `an unexpected error ocurred: ${err.message}`,
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}

async function GetByUserId(userId) {
  try {
    const routines = await  routineRepository.findByUserId(userId);
    
    return { routines: routines, err: null };
  } catch (error) {
    return {
      routines: null,
      err: new CustomError(
        `an unexpected error ocurred: ${error.message}`,
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}
export { Create, GetAll, Get, GetByUserId };
