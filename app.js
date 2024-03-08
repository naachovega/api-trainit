import express from "express";
import pkg from "dotenv";
import cors from 'cors'
import {
  authRouter,
  routineRouter,
  exerciseRouter,
  userRouter,
  qrRouter,
} from "./src/routes/index.js";
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
app.use(cors())

app.use(`${defaultEndpoint}/auth`, apiKeyMiddleware, authRouter);
app.use(`${defaultEndpoint}/routine`, apiKeyMiddleware, routineRouter);
app.use(`${defaultEndpoint}/exercise`, apiKeyMiddleware, exerciseRouter);
app.use(`${defaultEndpoint}/user`, apiKeyMiddleware, userRouter);
app.use(`${defaultEndpoint}/qr`, apiKeyMiddleware, qrRouter);

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
