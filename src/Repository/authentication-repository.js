import { authStorage } from "../Storage/index.js";

export class AuthenticationRepository {
  constructor() {
    this.storage = authStorage;
  }
  async createUserByEmail(user) {
    return await this.storage.createUserByEmail(user);
  }

  deleteUser(email, password) {
    this.storage.deleteUser(email, password);
  }

  signIn(email, password) {
    this.storage.signIn(email, password);
  }
}
