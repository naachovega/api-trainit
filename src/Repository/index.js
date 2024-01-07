import { AuthenticationRepository } from "./authentication-repository.js";
import { UserRepository } from "./user-repository.js";
import { RoutineRepository } from "./routine-repository.js";

const authRepository = new AuthenticationRepository();
const userRepository = new UserRepository();
const routineRepository = new RoutineRepository();

export { authRepository, userRepository,routineRepository };
