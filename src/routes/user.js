import express from "express";
import {
  GetAllUsers,
  GetUserById,
  UpdateUser,
  UpdateUserEmail,
  DeleteUser,
  ResetWeeklyValues
} from "../Controller/index.js";
import {
  userExistIdParam,
  validateEmailMiddleware,
} from "../Middleware/index.js";
import {
  UserUpdateDTO
} from "../Models/user-updateDTO.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const {
    users,
    err
  } = await GetAllUsers();

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: users,
  });
});

userRouter.get("/:id", userExistIdParam, async (req, res) => {
  const {
    id
  } = req.params;

  const {
    user,
    err
  } = await GetUserById(id);
  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: user[0],
  });
});

userRouter.patch("/:id", userExistIdParam, async (req, res) => {
  const {
    id
  } = req.params;

  const {
    interests,
    birthdate,
    bio
  } = req.body;

  const userDTO = new UserUpdateDTO(interests, birthdate, bio);

  const {
    user,
    err
  } = await UpdateUser(id, userDTO);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: user[0],
  });
});

userRouter.patch(
  "/email/:id",
  userExistIdParam,
  validateEmailMiddleware,
  async (req, res) => {
    const {
      id
    } = req.params;
    const {
      email
    } = req.body;

    const {
      user,
      err
    } = await UpdateUserEmail(id, email);

    if (err) {
      return res.status(err.code).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      data: user,
    });
  }
);

userRouter.delete("/:id", userExistIdParam, async (req, res) => {
  const {
    id
  } = req.params;

  const err = await DeleteUser(id);

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(204).json({});
});

userRouter.patch("/reset-weekly/:id", userExistIdParam, async (req, res) => {
  const {
    id
  } = req.params

  const {
    err,
    user
  } = await ResetWeeklyValues(id)

  if (err) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(200).json({
    data: user
  });

})

export default userRouter;