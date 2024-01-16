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

    return { users: users, err: null };
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

    return { user: user, err: null };
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

    return { user: user, err: null };
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
};
