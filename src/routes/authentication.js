import express from "express";
import { createUserByEmail, finishRegister } from "../Controller/index.js";
import { CustomError } from "../Models/Interfaces/Errors.js";
import {
  userExistMiddleware,
  userDoesNotExistMiddleware,
  alreadyRegisteredMiddleware,
} from "../Middleware/index.js";

const authRouter = express.Router();

authRouter.post("/register", userDoesNotExistMiddleware, async (req, res) => {
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
});

authRouter.get("/sign-in", (req, res) => {
  const { email, password } = req.body;
});

authRouter.patch(
  "/finish-register",
  userExistMiddleware,
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
