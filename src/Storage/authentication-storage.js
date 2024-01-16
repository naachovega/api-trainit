import StorageConnection from "./storage-connection.js";

export class AuthenticationStorage {
  constructor() {
    this.storage = new StorageConnection("Credentials");
    this.collection = this.storage.getCollection();
  }
  async createUserByEmail(user) {
    this.collection.insertOne(user);
  }
  async getUserByEmail(email) {
    const user = await this.collection.find({ username: email }).toArray(0);

    return user;
  }
  async getUserById(_id) {
    const user = await this.collection.find({ _id: _id }).toArray(0);

    return user;
  }

  async addCodeToFinishRegister(_id, code) {
    return await this.collection.updateOne(
      { _id: _id },
      {
        $set: {
          registrationCode: code,
        },
      },
      true
    );
  }

  async finishRegistration(email, code) {
    return await this.collection.updateOne(
      { username: email },
      { $set: { finished: code } },
      true
    );
  }

  async recoverPasswordCode(uuid, code) {
    return await this.collection.updateOne(
      { _id: uuid },
      { $set: { recoveredPasswordCode: code } },
      true
    );
  }

  async newPassword(uuid, hash, salt) {
    return await this.collection.updateOne(
      { _id: uuid },
      { $set: { hash: hash, salt: salt } },
      true
    );
  }

  async updateUserEmail(_id, email) {
    return await this.collection.updateOne(
      { _id: _id },
      {
        $set: {
          username: email,
        },
      },
      true
    );
  }
}
