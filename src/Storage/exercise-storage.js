import StorageConnection from "./storage-connection.js";

export class ExerciseStorage {
  constructor() {
    this.storage = new StorageConnection("Exercises");
    this.collection = this.storage.getCollection();
  }

  async create(exercise) {
    return await this.collection.insertOne(exercise);
  }

  async get() {
    return await this.collection.find({}).toArray();
  }

  async getById(id) {
    return await this.collection.findOne({ _id: id });
  }

  async updateWeights(id, newWeight) {
    return await this.collection.updateOne(
      { _id: id },
      { $set: { actualWeight: newWeight } }
    );
  }
  async updateSet(id, setNumber) {
    return await this.collection.updateOne(
      { _id: id },
      { $set: { actualSet: setNumber } }
    );
  }
  async updateReps(id, repNumber) {
    return await this.collection.updateOne(
      { _id: id },
      { $set: { actualReps: repNumber } }
    );
  }

  async delete(id) {
    return await this.collection.deleteOne({ _id: id });
  }

  async finishExercise(id) {
    return await this.collection.updateOne(
      { _id: id },
      { $set: { completed: true } }
    );
  }

  async update(id, exercise) {
    return await this.collection.updateOne(
      { _id: id },
      {
        $set: {
          name: exercise.name,
          description: exercise.description,
          desiredReps: exercise.desiredReps,
          desiredSet: exercise.desiredSet,
          desiredWeight: exercise.desiredWeight,
          restTime: exercise.restTime,
        },
      }
    );
  }

  async getByRoutineId(routineId) {
    return await this.collection.find({ routineId: routineId }).toArray();
  }
}
