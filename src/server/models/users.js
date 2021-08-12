import mongoose, { Schema, Types } from "mongoose";

const MODEL_NAME = "Users";

const schema = new Schema({
  userName: Number,
  email: String,
  password: String,
  contribution: [
    {
      types: Types.ObjectId,
      ref: "Projects",
    },
  ],
});

const Model = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default Model;
