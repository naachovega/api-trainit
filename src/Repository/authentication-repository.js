import { AuthenticationStorage } from "../Storage/authentication-storage.js";
import { authStorage } from "../Storage/index.js";

export class AuthenticationRepository {
  constructor() {
    this.storage = authStorage;
  }
  createUser(email, password) {
    this.storage.createUser(email, password);
  }

  deleteUser(email, password) {
    this.storage.deleteUser(email, password);
  }

  signIn(email, password) {
    this.storage.signIn(email, password);
  }
}
