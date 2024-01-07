import express from "express";

const routineRouter = express.Router();

routineRouter.post("/", async (req, res) => {
  res.status(201).json({
      data : "routine created"
  });
});

export default routineRouter;
