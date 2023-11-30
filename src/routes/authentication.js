import express from "express";
import { authRepository } from "../Repository/index.js";

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  const { email, password } = req.body;
  authRepository.createUser(email, password);
  res.send("Exitoso").status(201);
});

authRouter.get("/sign-in", (req, res) => {
  const { email, password } = req.body;
  authRepository.signIn(email, password);
  res.send("Signed in").status(200);
});

export default authRouter;
