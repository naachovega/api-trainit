import express from "express";
import {
  createUserByEmail,
  getUsersCredential,
  finishRegister,
} from "../Controller/index.js";
import { CustomError } from "../Models/Interfaces/Errors.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, getUserErr } = await getUsersCredential(email);

    if (getUserErr) {
      throw new CustomError(err.message, err.code, err.stackErrorMessage);
    }

    if (user.length > 0) {
      return res
        .json({
          message: "User already exists.",
          code: 409,
        })
        .status(409);
    }

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

//add middleware to check if the user exists
//add middleware to check if the user has already finish registering
authRouter.patch("/finish-register", async (req, res) => {
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
});

export default authRouter;
