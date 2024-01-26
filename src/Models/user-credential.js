
export default class UserCredential {
    constructor(_id, username, hash, salt) {
        this._id = _id,
        this.username = username,
        this.hash = hash,
        this.salt = salt
    }
}