//User DTO with the information ATM of finishing the registration process
class UserUpdateDTO {
  constructor(interests, birthdate, bio) {
    (this.interests = interests),
      (this.birthdate = birthdate),
      (this.bio = bio);
  }
}

export { UserUpdateDTO };
