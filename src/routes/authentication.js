import express from "express";
import {
  createUserByEmail,
  finishRegister,
  signIn,
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
} from "../Middleware/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateEmailMiddleware,
  validatePasswordMiddleware,
  userDoesNotExistMiddleware,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      let createErr = await createUserByEmail(email, password);

      if (createErr) {
        throw new CustomError(err.message, err.code, err.stackErrorMessage);
      }

      return res
        .json({
          message: "The user was created OK",
          code: 201,
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

authRouter.patch(
  "/finish-register",
  userExistByIdMiddleware,
  alreadyRegisteredMiddleware,
  async (req, res) => {
    const err = await finishRegister(req);

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

export default authRouter;
