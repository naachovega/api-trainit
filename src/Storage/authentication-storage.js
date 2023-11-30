import StorageConnection from "./storage-connection.js";

export class AuthenticationStorage {
  constructor() {
    this.storage = new StorageConnection("User");
    this.collection = this.storage.getCollection();
  }
  async createUser(email, password) {
    console.log(email, password);
  }

  async deleteUser(email, password) {}

  async signIn(email, password) {}
}
