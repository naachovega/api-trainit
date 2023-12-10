import express from "express";
import pkg from "dotenv";
import { authRouter } from "./src/routes/index.js";
import {
  errorMiddelware,
  apiKeyMiddleware,
  notFoundMiddlware,
} from "./src/Middleware/index.js";

const { dotenv } = pkg;
const result = pkg.config();
const app = express();
const port = process.env.PORT || 3000;
const defaultEndpoint = "/api";

app.use(express.json());

app.use(`${defaultEndpoint}/auth`, apiKeyMiddleware, authRouter);

app.get("/", (req, res) => {
  let startTime = performance.now();
  let endTime = performance.now();
  let timeElapsed = endTime - startTime;

  return res.status(200).json({
    status: "API currently running",
    timestamp: timeElapsed,
  });
});

app.use(notFoundMiddlware);
app.use(errorMiddelware);

app.listen(port, () => {
  console.log(`API Running and listening on port: ${port}`);
});
