import { userRepository } from "../Repository/index.js";

async function userExistIdParam(req, res, next) {
  const { id } = req.params;

  const user = await userRepository.getUserById(id);
  if (user.length === 0) {
    return res
      .json({
        message: "User does not exist",
        code: 400,
      })
      .status(400);
  }
  return next();
}

async function userExistByIdMiddleware(req, res, next) {
  const { _id, userId } = req.body;
  const id = _id || userId;

  const user = await userRepository.getUserById(id);
  if (user.length === 0) {
    return res
      .json({
        message: "User does not exist",
        code: 400,
      })
      .status(400);
  }
  res.locals.user = user;
  return next();
}

async function userExistByEmailMiddleware(req, res, next) {
  const { email } = req.body;
  const user = await userRepository.getUserByEmail(email);

  if (user.length === 0) {
    return res
      .json({
        message: "User does not exist",
        code: 400,
      })
      .status(400);
  }
  res.locals.user = user;
  return next();
}

async function userDoesNotExistMiddleware(req, res, next) {
  const { email } = req.body;
  const user = await userRepository.getUserByEmail(email);
  if (user.length > 0) {
    return res.status(409).json({
      message: "User already exists",
      code: 409,
    });
  }
  return next();
}

export {
  userDoesNotExistMiddleware,
  userExistByEmailMiddleware,
  userExistByIdMiddleware,
  userExistIdParam,
};
