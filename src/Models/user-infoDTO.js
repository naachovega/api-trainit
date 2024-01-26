//User DTO with the information ATM of finishing the registration process
class UserDTO {
  constructor(name, lastName, birthdate, interests, registered) {
    (this.name = name),
      (this.lastName = lastName),
      (this.birthdate = birthdate),
      (this.interests = interests),
      (this.registered = registered);
  }
}

export { UserDTO };
