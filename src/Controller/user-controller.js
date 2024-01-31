import {
  CustomError
} from "../Models/Interfaces/Errors.js";
import {
  authRepository,
  userRepository
} from "../Repository/index.js";

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
      "An unexpected error ocurred."
    );
  }
}

async function RemoveRoutineId(userId, routineId) {
  try {
    const modified = await userRepository.removeRoutineId(userId, routineId);

    if (!modified.acknowledged) {
      return new CustomError(
        "The routine couldnt be removed to the user correctly.",
        400,
        "The routine couldnt be removed to the user correctly."
      );
    }
  } catch (err) {
    return new CustomError(
      "An unexpected error ocurred.",
      500,
      "An unexpected error ocurred."
    );
  }
}

async function GetAllUsers() {
  try {
    const users = await userRepository.getUsers();

    return {
      users: users,
      err: null
    };
  } catch (err) {
    return {
      users: null,
      err: new CustomError(
        "an unexpected error ocurred",
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}

async function GetUserById(id) {
  try {
    const user = await userRepository.getUserById(id);

    return {
      user: user,
      err: null
    };
  } catch (err) {
    return {
      user: null,
      err: new CustomError(
        "an unexpected error ocurred",
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}

async function UpdateUser(id, userDTO) {
  try {
    const dbUser = await userRepository.getUserById(id);

    let user = validateUserInformation(dbUser[0], userDTO);

    const modified = await userRepository.updateUser(id, user);

    if (!modified.acknowledged) {
      return {
        user: null,
        err: new CustomError(
          "the user couldnt be updated",
          400,
          "the user couldnt be updated"
        ),
      };
    }

    user = await userRepository.getUserById(id);

    return {
      user: user,
      err: null
    };
  } catch (err) {
    return {
      user: null,
      err: new CustomError(
        "an unexpected error ocurred",
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}

async function UpdateUserEmail(id, email) {
  try {
    let user = await userRepository.getUserByEmail(email);

    if (user.length > 0) {
      return {
        user: null,
        err: new CustomError(
          "the email already exist in the system",
          422,
          "the email already exist in the system"
        ),
      };
    }

    const modified = await userRepository.updateUserEmail(id, email);

    if (!modified.acknowledged) {
      return {
        user: null,
        err: new CustomError(
          "the user email couldnt be updated",
          400,
          "the user email couldnt be updated"
        ),
      };
    }

    const authModified = await authRepository.updateUserEmail(id, email);

    if (!authModified.acknowledged) {
      return {
        user: null,
        err: new CustomError(
          "there was an error updating the user",
          400,
          "there was an error updating the user"
        ),
      };
    }

    user = await userRepository.getUserById(id);

    return {
      user: user,
      err: null
    };
  } catch (err) {
    return {
      user: null,
      err: new CustomError(
        "an unexpected error ocurred",
        500,
        "an unexpected error ocurred"
      ),
    };
  }
}

async function DeleteUser(id) {
  try {
    let deleted = await userRepository.deleteUser(id);

    if (!deleted.acknowledged) {
      return new CustomError(
        "the user couldnt be deleted",
        500,
        "the user couldnt be deleted"
      );
    }

    deleted = await authRepository.deleteUser(id);
    if (!deleted.acknowledged) {
      return new CustomError(
        "the user couldnt be deleted",
        500,
        "the user couldnt be deleted"
      );
    }
  } catch (err) {
    return new CustomError(
      "an unexpected error ocurred",
      500,
      "an unexpected error ocurred"
    );
  }
}

async function ResetWeeklyValues(id) {
  try {
    const reseted = await userRepository.resetWeeky(id)

    if (!reseted.acknowledged) {
      return {
        user: "",
        err: new CustomError(
          "the user couldnt be deleted",
          400,
          "the user couldnt be deleted"
        )
      };
    }

    const user = await userRepository.getUserById(id)
    return {
      user: user,
      err: null
    }

  } catch (err) {
    return {
      user: null,
      err: new CustomError(
        "an unexpected error ocurred",
        500,
        "an unexpected error ocurred"
      )
    };
  }
}

function validateUserInformation(user, userDTO) {
  if (userDTO.interests) {
    user.interests = userDTO.interests;
  }
  if (userDTO.birthdate) {
    user.birthdate = userDTO.birthdate;
  }
  if (userDTO.bio) {
    user.bio = userDTO.bio;
  }

  return user;
}

export {
  AddRoutineToUser,
  RemoveRoutineId,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  UpdateUserEmail,
  DeleteUser,
  ResetWeeklyValues
};