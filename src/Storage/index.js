import { AuthenticationStorage } from "./authentication-storage.js";
import { ExerciseStorage } from "./exercise-storage.js";
import { RoutineStorage } from "./routine-storage.js";
import { UserStorage } from "./user-storage.js";

const authStorage = new AuthenticationStorage();
const userStorage = new UserStorage();
const routineStorage = new RoutineStorage();
const exerciseStorage = new ExerciseStorage();

export { authStorage, userStorage, routineStorage, exerciseStorage };
