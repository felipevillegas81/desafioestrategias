import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: false },
    password: { type: String, required: false },
    role: { type: String, required: true, default: 'user' },

})

export const userModel = model('users', userSchema)