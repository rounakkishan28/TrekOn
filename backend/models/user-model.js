import { Schema, model } from 'mongoose';
import pkg from 'bcryptjs';

const { genSalt, hash, compare } = pkg;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

const User = model('User', userSchema);

export default User;
