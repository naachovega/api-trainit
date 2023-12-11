import {
  apiKeyMiddleware,
  alreadyRegisteredMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
  validateSignInMiddleware,
} from "./authentication-middleware.js";

import { errorMiddelware, notFoundMiddlware } from "./error-middleware.js";

import {
  userDoesNotExistMiddleware,
  userExistByEmailMiddleware,
  userExistByIdMiddleware,
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
};
