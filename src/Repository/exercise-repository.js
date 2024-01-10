import { exerciseStorage } from "../Storage/index.js";

export class ExeriseRepository {
  constructor() {
    this.storage = exerciseStorage;
  }

  async create(exercise) {
    return await this.storage.create(exercise);
  }

  async get() {
    return await this.storage.get();
  }
  async getById(id) {
    return await this.storage.getById(id);
  }

  async updateWeights(id, newWeight) {
    return await this.storage.updateWeights(id, newWeight);
  }
  async updateSet(id, setNumber) {
    return await this.storage.updateSet(id, setNumber);
  }
  async updateReps(id, repNumber) {
    return await this.storage.updateReps(id, repNumber);
  }

  async delete(id) {
    return await this.storage.delete(id);
  }
  async finishExercise(id) {
    return await this.storage.finishExercise(id);
  }
}
