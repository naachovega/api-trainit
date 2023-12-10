import { userStorage } from "../Storage/index.js";

export class UserRepository {
  constructor() {
    this.storage = userStorage;
  }
  getUserByEmail(email) {
    return this.storage.getUserByEmail(email);
  }

  async createUserByEmail(user) {
    await this.storage.createUserByEmail(user);
  }

  async finishRegister(_id, userDTO) {
    return await this.storage.finishRegister(_id, userDTO);
  }

  async getUserById(_id) {
    return await this.storage.getUserById(_id);
  }
}
