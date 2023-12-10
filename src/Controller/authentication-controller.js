import { v4 } from "uuid";
import { hashPassword, generateCredential } from "../Helpers/index.js";
import { CustomError } from "../Models/Interfaces/Errors.js";
import UserCredential from "../Models/user-credential.js";
import { UserDTO } from "../Models/user-infoDTO.js";
import User from "../Models/user.js";
import { authRepository, userRepository } from "../Repository/index.js";

async function createUserByEmail(email, password) {
  try {
    const { hash, salt } = hashPassword(password);

    const _id = v4();

    const userCredential = new UserCredential(_id, email, hash, salt);

    const user = new User(_id, email, generateCredential());

    await authRepository.createUserByEmail(userCredential);

    await userRepository.createUserByEmail(user);

    return;
  } catch (error) {
    return new CustomError(
      "There was a problem creating the user.",
      500,
      error.message
    );
  }
}

async function getUsersCredential(email) {
  try {
    const user = await authRepository.getUserByEmail(email);
    return user;
  } catch (err) {
    return {
      err: new CustomError(
        "There was a problem fetching the user",
        500,
        err.message
      ),
    };
  }
}

async function finishRegister(request) {
  try {
    const { _id, name, lastName, birthdate, interests } = request.body;

    const userDTO = new UserDTO(name, lastName, birthdate, interests, true);

    const modified = await userRepository.finishRegister(_id, userDTO);

    if (modified.modifiedCount == 0) {
      return new CustomError(
        "No information was updated.",
        400,
        "No information was updated."
      );
    }
  } catch (error) {
    return new CustomError(
      "There was a problem updating the information.",
      500,
      error.message
    );
  }
}

export { createUserByEmail, getUsersCredential, finishRegister };
