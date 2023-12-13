import { v4 } from "uuid";
import {
  hashPassword,
  generateCredential,
  validatePassowrd,
  sendEmail,
} from "../Helpers/index.js";
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

    const registrationCode = Math.floor(Math.random() * 99999);

    const codeCreated = await authRepository.addCodeToFinishRegister(
      _id,
      registrationCode
    );

    if (codeCreated.modifiedCount == 0) {
      return new CustomError(
        "The code wasnt generated properly.",
        400,
        "The code wasnt generated properly."
      );
    }

    const err = sendEmail(email, registrationCode);

    if (err) {
      return { code: null, err: err, id: null };
    }
    return { err: null, code: registrationCode, id: _id };
  } catch (error) {
    return {
      err: {
        errMessage: "There was a problem updating the information.",
        errCode: 500,
        errStringMessage: error.message,
      },
      code: null,
    };
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
    return new CustomError(error.message, 500, error.message);
  }
}

async function signIn(email, password) {
  try {
    const user = await getUsersCredential(email);

    const stringPassword = password.toString();

    validatePassowrd(stringPassword, user[0].salt, user[0].hash);
    return { user: user, err: null };
  } catch (error) {
    return {
      user: null,
      err: {
        errMessage: error.message,
        code: 500,
      },
    };
  }
}

async function finishRegisterByCode(email, code) {
  const user = await authRepository.getUserByEmail(email);

  const userCode = user[0].registrationCode;

  if (code != userCode) {
    return new CustomError("The code is invalid", 400, "The code is invalid");
  }

  const modified = await authRepository.finishRegistration(email, true);
  console.log(modified);
  return;
}

export {
  createUserByEmail,
  getUsersCredential,
  finishRegister,
  signIn,
  finishRegisterByCode,
};
