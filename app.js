import express from "express";

const app = express();
const port = 3000;
const defaultEndpoint = "/api";

app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({
    status: "API currently running",
  });
});

app.listen(port, () => {
  console.log(`API Listening on port: ${port}`);
});

