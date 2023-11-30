import express from "express";
import pkg from "dotenv";
const { dotenv } = pkg;
const result = pkg.config();

import { authRouter } from "./src/routes/index.js";

const app = express();
const port = process.env.PORT || 3000;
const defaultEndpoint = "/api";

app.use(express.json());

app.use(`${defaultEndpoint}/auth`, authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "API currently running",
  });
});

app.listen(port, () => {
  console.log(`API Listening on port: ${port}`);
});
