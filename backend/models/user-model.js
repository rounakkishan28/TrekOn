import { Schema, model } from "mongoose";
import pkg from 'bcryptjs';

const { genSalt, hash, compare } = pkg;

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
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
