import mongoose from 'mongoose';


const {Schema, model} = mongoose;

const userSchema = new Schema({
	firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true	 
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    photo: {
        type: String
    },
    access: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    userId: {
        type: Number,
        default: Math.floor(Math.random() * 1000000) + 20000000
    },
    resetLink: {
        data: String,
        default: ""
    }
}, {timestamps: true})

export const User = model('user', userSchema); 