const User = require("./models/userModel");

const jane = User.creat({ email: "Jane@exp.com", password: "454c54c5c5c1" });
console.log(jane instanceof User); // true
console.log(jane); // "Jane"