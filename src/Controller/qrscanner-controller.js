import { DateHelper } from "../Helpers/index.js";
import { CustomError } from "../Models/Interfaces/Errors.js";
import { userRepository } from "../Repository/index.js";

async function Scan(id) {
  try {
    // edit the values of the training related stuff of the user
    const today = new Date();

    const user = await userRepository.getUserById(id);

    if (!DateHelper(user[0])) {
      return {
        err: null,
        newWeeklyAttendance: user[0].gymAttendanceWeekly,
        newMonthlyAttendance: user[0].gymAttendanceMonthly,
      };
    }

    const newWeeklyAttendance = user[0].gymAttendanceWeekly + 1;
    const newMonthlyAttendance = user[0].gymAttendanceMonthly + 1;

    const modified = await userRepository.updateGymAttendance(
      id,
      newWeeklyAttendance,
      newMonthlyAttendance,
      today
    );

    if (!modified.acknowledged) {
      return {
        err: new CustomError(
          "the values couldnt be updated",
          400,
          "the values couldnt be updated"
        ),
        newWeeklyAttendance: 0,
        newMonthlyAttendance: 0,
      };
    }
    return {
      err: null,
      newWeeklyAttendance: newWeeklyAttendance,
      newMonthlyAttendance: newMonthlyAttendance,
    };
  } catch (err) {
    return {
      err: new CustomError(
        `an unexpected error ocurred ${err.message}`,
        500,
        `an unexpected error ocurred ${err.message}`
      ),
      newWeeklyAttendance: 0,
      newMonthlyAttendance: 0,
    };
  }

}

export { Scan };
