import express from "express";
import { createUserByEmail, getUserByEmail } from "../Controller/index.js";
import { authRepository } from "../Repository/index.js";
import { CustomError } from "../Models/Interfaces/Errors.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {

    const { email, password } = req.body;

    const { user, err } = await getUserByEmail(email);

    if (err) {
      throw new CustomError(err.message, err.code, err.stackErrorMessage)
    }

    if (user) {
      return res.json({
        message: "User already exists.",
        code: 409,
      }).status(409);
    }

    err = await createUserByEmail(email, password);

    if (err) {
      throw new CustomError(err.message, err.code, err.stackErrorMessage)
    }

    return res.json({
      message: "The user was created OK",
      code: 201,
    }).status(201);

  } catch (err) {
    return res.json({
      message: err.message,
      code: err.code,
      stackErrorMessage: err.stackErrorMessage,
    }).status(err.code);
  }
});

authRouter.get("/sign-in", (req, res) => {
  const { email, password } = req.body
});

export default authRouter;
