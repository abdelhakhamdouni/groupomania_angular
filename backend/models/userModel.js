class User {
  constructor(
    id,
    firstName,
    lastName,
    pseudo,
    email,
    phone,
    password,
    avatar,
    createdAt
  ) {
    this.id = id || null;
    this.firstName = firstName;
    this.lastName = lastName;
    this.pseudo = pseudo;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.avatar = avatar;
    this.createdAt = createdAt;
  }
}
module.exports = User;
