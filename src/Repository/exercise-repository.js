import { exerciseStorage } from "../Storage/index.js";

export class ExeriseRepository {
  constructor() {
    this.storage = exerciseStorage;
  }

  async create(exercise) {
    return await this.storage.create(exercise);
  }
}
