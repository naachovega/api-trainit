import { AuthenticationStorage } from "./authentication-storage.js";
import { UserStorage } from "./user-storage.js";

const authStorage = new AuthenticationStorage();
const userStorage = new UserStorage();

export { authStorage, userStorage };
