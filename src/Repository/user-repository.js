import { userStorage } from "../Storage/index.js";

export class UserRepository {
    constructor() {
        this.storage = userStorage;
    }
    async getUserByEmail(email) {
        return await this.storage.getUserByEmail(email)
    }

    async createUserByEmail(user) {
        await this.storage.createUserByEmail(user)
    }
}
