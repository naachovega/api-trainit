import StorageConnection from "./storage-connection.js";

export class RoutineStorage {
  constructor() {
    this.storage = new StorageConnection("Routine");
    this.collection = this.storage.getCollection();
  }

  async create(routine) {
    return await this.collection.insertOne(routine);
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async get(id) {
    return await this.collection.findOne({ _id: id });
  }
  async getByUserId(userId) {
    return await this.collection.find({ userId: userId }).toArray();
  }

  async addExerciseId(_id, exerciseId) {
    return await this.collection.updateOne(
      { _id: _id },
      {
        $push: {
          exercises: exerciseId,
        },
      },
      true
    );
  }
}
