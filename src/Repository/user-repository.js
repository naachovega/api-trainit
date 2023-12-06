import { userStorage } from "../Storage/index.js";

export class UserRepository {
    constructor() {
        this.storage = userStorage;
    }
    getUserByEmail(email) {
        return this.storage.getUserByEmail(email)
    }

    async createUserByEmail(user) {
        await this.storage.createUserByEmail(user)
    }
}
