import pkg from "dotenv";
const { dotenv } = pkg;
const result = pkg.config();

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey != process.env.APIKEY) {
    return res
      .json({
        message: "Invalid Api Key",
        code: 401,
      })
      .status(401);
  }
  return next();
}

function alreadyRegisteredMiddleware(req, res, next) {
  const { registered } = res.locals.user[0];
  if (registered) {
    return res
      .json({
        message: "The user has already completed the registration process",
        code: 400,
      })
      .status(400);
  }
  return next();
}

export { apiKeyMiddleware, alreadyRegisteredMiddleware };
