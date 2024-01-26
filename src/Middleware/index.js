import {
  apiKeyMiddleware,
  alreadyRegisteredMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
  validateSignInMiddleware,
  validateRegistrationCode,
} from "./authentication-middleware.js";

import { errorMiddelware, notFoundMiddlware } from "./error-middleware.js";
import {
  validateRoutineId,
  validateExerciseId,
} from "./exercise-middleware.js";

import {
  userDoesNotExistMiddleware,
  userExistByEmailMiddleware,
  userExistByIdMiddleware,
  userExistIdParam,
} from "./user-middleware.js";

export {
  apiKeyMiddleware,
  userExistByEmailMiddleware,
  userDoesNotExistMiddleware,
  errorMiddelware,
  notFoundMiddlware,
  alreadyRegisteredMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
  validateSignInMiddleware,
  userExistByIdMiddleware,
  validateRegistrationCode,
  validateRoutineId,
  validateExerciseId,
  userExistIdParam,
};
