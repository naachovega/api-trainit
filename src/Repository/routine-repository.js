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
}
