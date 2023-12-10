import { userRepository } from "../Repository/index.js";

async function userExistMiddleware(req, res, next) {
  const { _id } = req.body;
  const user = await userRepository.getUserById(_id);
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

export { userDoesNotExistMiddleware, userExistMiddleware };
