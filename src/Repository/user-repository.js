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
  async getUsers() {
    return await this.storage.getUsers();
  }
  async addRoutineId(_id, routineId) {
    return await this.storage.addRoutineId(_id, routineId);
  }
  async removeRoutineId(_id, routineId) {
    return await this.storage.removeRoutineId(_id, routineId);
  }

  async updateUser(_id, userDTO) {
    return await this.storage.updateUser(_id, userDTO);
  }

  async updateUserEmail(id, email) {
    return await this.storage.updateUserEmail(id, email);
  }
  async deleteUser(id) {
    return await this.storage.deleteUser(id);
  }
}
