import StorageConnection from "./storage-connection.js";

export class UserStorage {
    constructor() {
        this.storage = new StorageConnection("User");
        this.collection = this.storage.getCollection();
    }
    async getUserByEmail(email) {
        const user = await this.collection.find({ email: email }).toArray(0)

        return user
    }
    async createUserByEmail(user) {
        this.collection.insertOne(user);
    }
}
