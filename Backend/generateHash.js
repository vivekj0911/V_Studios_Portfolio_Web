// generateHash.js
import bcrypt from "bcryptjs";

const plainPassword = "myAdminPassword"; // <-- Change this to your real password

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log("Hashed password:", hash);
});
