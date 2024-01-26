import { authStorage } from "../Storage/index.js";

export class AuthenticationRepository {
  constructor() {
    this.storage = authStorage;
  }
  async createUserByEmail(user) {
    return await this.storage.createUserByEmail(user);
  }

  async getUserByEmail(email) {
    return this.storage.getUserByEmail(email);
  }
  async getUserById(_id) {
    return this.storage.getUserById(_id);
  }

  async deleteUser(email) {
    return this.storage.deleteUser(email);
  }

  signIn(email, password) {
    this.storage.signIn(email, password);
  }

  async addCodeToFinishRegister(_id, code) {
    return await this.storage.addCodeToFinishRegister(_id, code);
  }

  async finishRegistration(email, code) {
    return await this.storage.finishRegistration(email, code);
  }

  async recoverPasswordCode(uuid, code) {
    return await this.storage.recoverPasswordCode(uuid, code);
  }

  async newPassword(uuid, hash, salt) {
    return await this.storage.newPassword(uuid, hash, salt);
  }
  async updateUserEmail(id, email) {
    return await this.storage.updateUserEmail(id, email);
  }
}
