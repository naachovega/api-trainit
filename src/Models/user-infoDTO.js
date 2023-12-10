//User DTO with the information ATM of finishing the registration process
class UserDTO {
  constructor(
    tempName,
    tempLastName,
    tempBirthdate,
    tempInterests,
    registered
  ) {
    (this.name = tempName),
      (this.lastName = tempLastName),
      (this.birthdate = tempBirthdate),
      (this.interests = tempInterests),
      (this.registered = registered);
  }
}

export { UserDTO };
