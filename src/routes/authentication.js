import express from "express";
import { createUserByEmail } from "../Controller/index.js";

import { authRepository } from "../Repository/index.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // validar que no exista este email previamente

  const err = await createUserByEmail(email, password);

  if (err) {
    if (err.code === 500) {
      res
        .json({
          message: err.message,
          stackErrorMessage: err.stackErrorMessage,
          code: err.code,
        })
        .status(err.code);
    }
  }
  
  res
    .json({
      message: "The user was created OK",
      code: 201,
    })
    .status(201);
});

authRouter.get("/sign-in", (req, res) => {
  const { email, password } = req.body;
  authRepository.signIn(email, password);
  res.send("Signed in").status(200);
});

export default authRouter;
