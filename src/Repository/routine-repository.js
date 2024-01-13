import { routineStorage } from "../Storage/index.js";

export class RoutineRepository {
  constructor() {
    this.storage = routineStorage;
  }

  async create(routine) {
    return await this.storage.create(routine);
  }

  async findAll() {
    return await this.storage.getAll();
  }

  async find(id) {
    return await this.storage.get(id);
  }

  async findByUserId(userId) {
    return await this.storage.getByUserId(userId);
  }
  async addExerciseId(id, exerciseId) {
    return await this.storage.addExerciseId(id, exerciseId);
  }
}
