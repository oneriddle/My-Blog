import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email Required"],
  },
  password: {
    type: String,
    required: [true, "Password Required"],
    select: false,
  },
  fullName: {
    type: String,
    required: [true, "Full name Required"],
    select: false,
    minLength: [3, "Fullname must be at least 3 characters"],
    maxLength: [50, "Fullname must be at most 50 characters"],
  },
});

const User = models.User || model("User", userSchema);

export default User;
