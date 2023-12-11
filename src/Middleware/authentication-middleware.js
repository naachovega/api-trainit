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

function validateEmailMiddleware(req, res, next) {
  const { email } = req.body;
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    "gm"
  );

  if (!email) {
    return res
      .json({
        message: "Email can't be empty",
        code: 400,
      })
      .status(400);
  }
  if (!emailRegex.test(email)) {
    return res
      .json({
        message: "Please enter a valid Email",
        code: 400,
      })
      .status(400);
  }

  return next();
}

function validatePasswordMiddleware(req, res, next) {
  const { password } = req.body;

  const passwordRegexLength = new RegExp(
    /^[a-zA-Z0-9!@#\$%\^\&*\?\)\(+=._-]{6,}$/g
  );

  if (!password) {
    return res
      .json({
        message: "Password cant be empty",
        code: 400,
      })
      .status(400);
  }

  if (!passwordRegexLength.test(password)) {
    return res
      .json({
        message: "Invalid Password",
        code: 400,
      })
      .status(400);
  }

  return next();
}
export {
  apiKeyMiddleware,
  alreadyRegisteredMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
};
