import StorageConnection from "./storage-connection.js";

export class RoutineStorage {
  constructor() {
    this.storage = new StorageConnection("Routine");
    this.collection = this.storage.getCollection();
  }
}
