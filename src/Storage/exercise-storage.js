import StorageConnection from "./storage-connection.js";

export class ExerciseStorage {
  constructor() {
    this.storage = new StorageConnection("Exercises");
    this.collection = this.storage.getCollection();
  }

  async create(exercise) {
    return await this.collection.insertOne(exercise);
  }
}
