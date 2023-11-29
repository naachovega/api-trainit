import { MongoClient } from "mongodb";

export default class StorageConnection {
  constructor(collection) {
    this.connection = process.env.MONGOCONNECTION;
    this.dbName = process.env.MONGOUSER;
    this.collectionName = collection;
    this.client = new MongoClient(this.connection);
    this.connect();
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
  }

  async connect() {
    await this.client.connect();
  }

  getCollection() {
    return this.collection;
  }
}
