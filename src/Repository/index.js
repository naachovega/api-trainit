import { AuthenticationRepository } from "./authentication-repository.js";
import { UserRepository } from "./user-repository.js";
import { RoutineRepository } from "./routine-repository.js";
import { ExeriseRepository } from "./exercise-repository.js";

const authRepository = new AuthenticationRepository();
const userRepository = new UserRepository();
const routineRepository = new RoutineRepository();
const exerciseRepository = new ExeriseRepository();

export {
  authRepository,
  userRepository,
  routineRepository,
  exerciseRepository,
};
