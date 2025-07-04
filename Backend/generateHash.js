// generateHash.js
import bcrypt from "bcryptjs";

const plainPassword = "Admin@0911"; // <-- Change this to your real password

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log("Hashed password:", hash);
});
