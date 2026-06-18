// Defines the user data structure in MongoDB using Mongoose.
// A "model" is like a blueprint for every user document that will be stored in the database

import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/indexServer";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // No two users can have same email
      trim: true, // Remove spaces from start and end incase users mistake
      lowercase: true, // always store email in lowercase in the database
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email format",
      ], //Regex email validation
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 18 characters"],
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // New users are Not admins by default
    },

    // Optinal profile avatar stored as a Cloudinary URL
    avatar: {
      type: String,
      default: "",
    },

    //we store these so we can DELETE this old avatar from cloudinary when the user uploads a new one (to save storage space)
    avatarPublicId: {
      type: String,
      default: "",
    },

    //optional contact info for faster checkout
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  },
);

//---- MIDDLEWARE (RUNS AUTOMATICALLY BEFORE SAVING)-------
//pre("save") runs before a user document is saved to the database
// we use this to hash password to plain text is NEVER STORED

userSchema.pre("save", async function (next) {
  //This refers to the user being saved
  // only hash if the password was aacutually changed
  //this prevents re-hashing analready hashed password

  if (!this.isModified("password")) {
    return;
  }
  //bcrypt creates a random "salt" (extra random data)
  const salt = await bcrypt.genSalt(10); //The "10"is the cost factor - higher = more secure but slower

  //Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);

});

//---- METHODS (Custom functions on user document)----
//Compare an entered plain-text password with the stored hash
// Returns true if they match, false if they don't
userSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  //bcrypt.compare handles the comparison safely
  return await bcrypt.compare(enteredPassword, this.password);
};

//Create and export the User model
//mongoose.model("User", userSchema) create a model named "User"
//MongoBD will store document in a collection called "users" (auto-pluratilized)

const User = mongoose.model<IUser>("User", userSchema);

export default User;
