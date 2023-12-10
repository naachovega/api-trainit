import { MongoClient } from "mongodb";
import pkg from "dotenv";
const { dotenv } = pkg;
const result = pkg.config();

export default class StorageConnection {
  constructor(collection) {
    this.connection = process.env.MONGOCONNECTION;
    this.dbName = process.env.MONGODB;
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
