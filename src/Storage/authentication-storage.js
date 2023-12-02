import StorageConnection from "./storage-connection.js";

export class AuthenticationStorage {
  constructor() {
    this.storage = new StorageConnection("Credentials");
    this.collection = this.storage.getCollection();
  }
  async createUserByEmail(user) {
    this.collection.insertOne(user);
  }

  async deleteUser(email, password) { }

  async signIn(email, password) { }

  async getUserByEmail(email) {
    return await this.collection.find({ email: email }).toArray(0)
  }
}
