import { AuthenticationRepository } from "./authentication-repository.js";
import { UserRepository } from "./user-repository.js";

const authRepository = new AuthenticationRepository();
const userRepository = new UserRepository();

export { authRepository, userRepository };
