import { Schema, model } from "mongoose";
import pkg from 'bcryptjs';

const { genSalt, hash, compare } = pkg;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "Hi👋, welcome to my profile." },
  wishlist: { type: Object, default: {} },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
}

const User = model('User', userSchema);

export default User;
