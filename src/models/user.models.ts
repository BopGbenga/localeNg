import mongoose, { Schema, Model, Document } from "mongoose";

import bcrypt from "bcrypt";

export interface User extends Document {
  id?: Object;
  username: string;
  email: string;
  password: string;
  isValidPassword(password: string): Promise<boolean>;
}
const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

userSchema.pre<User>("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  // for hashing secret key
  // const key = await bcrypt.hash(user.secret_key, 10);
  // user.secret_key = key;
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

// const UserModel = model<User>("user", userSchema);
const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
