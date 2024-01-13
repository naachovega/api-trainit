import StorageConnection from "./storage-connection.js";

export class UserStorage {
  constructor() {
    this.storage = new StorageConnection("User");
    this.collection = this.storage.getCollection();
  }
  async getUserByEmail(email) {
    return await this.collection.find({ email: email }).toArray(0);
  }
  async createUserByEmail(user) {
    this.collection.insertOne(user);
  }

  async finishRegister(_id, userInfoDTO) {
    return await this.collection.updateOne(
      { _id: _id },
      {
        $set: {
          name: userInfoDTO.name,
          lastName: userInfoDTO.lastName,
          birthdate: userInfoDTO.birthdate,
          interests: userInfoDTO.interests,
          registered: true,
        },
      },
      true
    );
  }

  async getUserById(_id) {
    return await this.collection.find({ _id: _id }).toArray(0);
  }

  async addRoutineId(_id, routineId) {
    return await this.collection.updateOne(
      { _id: _id },
      {
        $push: {
          routines: routineId,
        },
      },
      true
    );
  }
}
