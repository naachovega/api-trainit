import pkg from "dotenv";
import { validatePassowrd } from "../Helpers/index.js";
import { authRepository } from "../Repository/index.js";
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

async function alreadyRegisteredMiddleware(req, res, next) {
  try {
    const { registered } = res.locals.user[0];
    if (registered) {
      return res
        .json({
          message: "The user has already completed the registration process",
          code: 400,
        })
        .status(400);
    }
    const credentials = await authRepository.getUserByEmail(
      res.locals.user[0].email
    );

    if (credentials[0].registrationCode === true) {
      return res
        .json({
          message: "The user hasnt validated the code yet",
          code: 400,
        })
        .status(400);
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      messge: error.message,
      code: 500,
    });
  }
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

async function validateSignInMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (password == undefined || password == null) {
    return res
      .json({
        message: "You must send a password",
        code: 401,
      })
      .status(401);
  }

  const user = await authRepository.getUserByEmail(email);

  const stringPassword = password.toString();

  if (!validatePassowrd(stringPassword, user[0].salt, user[0].hash)) {
    return res
      .json({
        message: "Invalid Password",
        code: 401,
      })
      .status(401);
  }
  return next();
}

async function validateRegistrationCode(req, res, next) {
  const { code, email } = req.body;

  const user = await authRepository.getUserByEmail(email);
  
  if (user[0].finished) {
    return res
      .json({
        message: "The user already used this code",
        code: 400,
      })
      .status(400);
  }
  if (user[0].registrationCode != code) {
    return res
      .json({
        message: "The code sent is invalid",
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
  validateSignInMiddleware,
  validateRegistrationCode,
};
