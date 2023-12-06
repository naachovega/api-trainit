import StorageConnection from "./storage-connection.js";

export class UserStorage {
    constructor() {
        this.storage = new StorageConnection("Credentials");
        this.collection = this.storage.getCollection();
    }
    async getUserByEmail(email) {
        const user = await this.collection.find({ username: email }).toArray(0)
        console.log(user)
        return user
    }
    async createUserByEmail(user) {
        this.collection.insertOne(user);
    }
}
