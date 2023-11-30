import StorageConnection from "./storage-connection.js";

export class AuthenticationStorage {
  constructor() {
    this.storage = new StorageConnection("User");
    this.collection = this.storage.getCollection();
  }
  async createUserByEmail(user) {
    this.collection.insertOne(user);
  }

  async deleteUser(email, password) {}

  async signIn(email, password) {}
}
