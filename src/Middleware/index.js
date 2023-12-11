import {
  apiKeyMiddleware,
  alreadyRegisteredMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
} from "./authentication-middleware.js";

import { errorMiddelware, notFoundMiddlware } from "./error-middleware.js";

import {
  userExistMiddleware,
  userDoesNotExistMiddleware,
} from "./user-middleware.js";

export {
  apiKeyMiddleware,
  userExistMiddleware,
  userDoesNotExistMiddleware,
  errorMiddelware,
  notFoundMiddlware,
  alreadyRegisteredMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
};
