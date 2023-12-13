import express from "express";
import {
  createUserByEmail,
  finishRegister,
  signIn,
  finishRegisterByCode,
} from "../Controller/index.js";
import { CustomError } from "../Models/Interfaces/Errors.js";
import {
  userExistByEmailMiddleware,
  userExistByIdMiddleware,
  userDoesNotExistMiddleware,
  alreadyRegisteredMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
  validateSignInMiddleware,
  validateRegistrationCode,
} from "../Middleware/index.js";

const authRouter = express.Router();

//validate that the user has already entered the code
authRouter.post(
  "/register",
  validateEmailMiddleware,
  validatePasswordMiddleware,
  userDoesNotExistMiddleware,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const { err, code, id } = await createUserByEmail(email, password);

      if (err) {
        throw new CustomError(err.message, err.code, err.stackErrorMessage);
      }

      return res
        .json({
          id: id,
          message: "The user was created OK",
          code: 201,
          registrationCode: code,
        })
        .status(201);
    } catch (err) {
      return res
        .json({
          message: err.message,
          code: err.code,
          stackErrorMessage: err.stackErrorMessage,
        })
        .status(err.code);
    }
  }
);

authRouter.post(
  "/sign-in",
  userExistByEmailMiddleware,
  validateSignInMiddleware,
  async (req, res) => {
    const { email, password } = req.body;
    const { user, err } = await signIn(email, password);

    if (err) {
      return res
        .json({
          message: err.message,
          code: err.code,
        })
        .status(err.code);
    }

    return res
      .json({
        user: user[0],
        code: 200,
      })
      .status(200);
  }
);

//Add the validation of the code sent via body, it must be the same as the one stored in the Users Credential
authRouter.patch(
  "/finish-register",
  userExistByIdMiddleware,
  alreadyRegisteredMiddleware,
  async (req, res) => {
    const { err } = await finishRegister(req);

    if (err) {
      return res
        .json({
          message: err.message,
          code: err.code,
        })
        .status(err.code);
    }

    res
      .json({
        message: "The user information was updated correctly",
        code: 200,
      })
      .status(200);
  }
);

//check the code middleware
authRouter.post(
  "/finish-registration",
  validateEmailMiddleware,
  userExistByEmailMiddleware,
  validateRegistrationCode,
  async (req, res) => {
    const { email, code } = req.body;
    const err = await finishRegisterByCode(email, code);

    if (err) {
      return res
        .json({
          message: err.message,
          code: err.code,
        })
        .status(err.code);
    }

    res
      .json({
        message: "Code is valid",
        code: 200,
        valid: true,
      })
      .status(200);
  }
);

export default authRouter;
