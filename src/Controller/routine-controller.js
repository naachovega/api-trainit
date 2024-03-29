import { CustomError } from "../Models/Interfaces/Errors.js";
import { exerciseRepository, routineRepository } from "../Repository/index.js";

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
    const routines = await routineRepository.findByUserId(userId);

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

async function AddExercisesToRoutine(id, exercises) {
  try {
    const length = exercises.length;

    let errCounter = 0;
    let addedCoutner = 0;
    for (let i = 0; i < length; i++) {
      const exercise = await exerciseRepository.getById(exercises[i]);

      if (!exercise) {
        continue;
      }

      const added = await routineRepository.addExerciseId(id, exercises[i]);

      if (!added.acknowledged) {
        errCounter++;
      } else {
        addedCoutner++;
      }
    }
    console.log(addedCoutner);
    if (errCounter > 0) {
      return new CustomError(
        `there was a problem adding ${errCounter} exercise/s to the routine`,
        500,
        `there was a problem adding ${errCounter} exercise/s to the routine`
      );
    }

    if (addedCoutner === 0) {
      return new CustomError(`no exercises added`, null, `no exercises added`);
    }

    return { addedCount: addedCoutner, err: null };
  } catch (err) {
    return {
      addedCount: 0,
      err: new CustomError(
        `an unexpected error ocurred: ${err.message}`,
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}

async function UpdateRotuineInfo(
  id,
  name,
  description,
  userId,
  dateString,
  day,
  month,
  year
) {
  try {
    const dbRoutine = await routineRepository.find(id);

    if (!dbRoutine) {
      return new CustomError(
        "the routine sent doesnt exist",
        400,
        "the routine coudlnt be updated"
      );
    }

    const newRoutine = validateRoutineInformation(
      dbRoutine,
      name,
      description,
      userId,
      dateString,
      day,
      month,
      year
    );

    const modified = await routineRepository.update(id, newRoutine);

    if (!modified.acknowledged) {
      return new CustomError(
        "the routine coudlnt be updated",
        400,
        "the routine coudlnt be updated"
      );
    }

    return { routine: newRoutine, err: null };
  } catch (err) {
    return {
      routine: null,
      err: new CustomError(
        "an unexpected error ocurred",
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}

function validateRoutineInformation(
  routine,
  name,
  description,
  userId,
  dateString,
  day,
  month,
  year
) {
  if (name) {
    routine.name = name;
  }
  if (description) {
    routine.description = description;
  }
  if (userId) {
    routine.userId = userId;
  }
  if (dateString) {
    routine.dateString = dateString;
  }
  if (day) {
    routine.day = day;
  }
  if (month) {
    routine.month = month;
  }
  if (year) {
    routine.year = year;
  }
  return routine;
}

export {
  Create,
  GetAll,
  Get,
  GetByUserId,
  AddExercisesToRoutine,
  UpdateRotuineInfo,
};
