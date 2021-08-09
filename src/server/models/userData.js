import mongoose, { Schema } from "mongoose";


const MODEL_NAME = "users";

const userBlock = new Schema({
    name: {
        type: String,
        required: true,
        min: 4,
    },
    email: {
        type: String,
        required: true,
        min: 5,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Model = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, userBlock);

export default Model;