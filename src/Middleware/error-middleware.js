import pkg from "dotenv";
const { dotenv } = pkg;
const result = pkg.config();

function notFoundMiddlware(req, res, next) {
  res.status(404).json({
    message: "Endpoint not found",
    code: 404,
  });
}

function errorMiddelware(err, req, res, next) {
  console.log(`There was an error. Please review: \n ${err.message}`);
  res.status(500).json({
    message:
      "There was a problem processing the request. Please try again later.",
    error: {
      message: err.message,
      stackMessage: process.env.NODE_ENV === "DEV" ? err.stack : "",
    },
    code: 500,
  });
}

export { notFoundMiddlware, errorMiddelware };
