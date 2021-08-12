import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Roles";

const RolesSchema = new Schema({
  name: String,
  projects: [[String]],
  comments: [[String]],
  taskList: [[String]],
  taskTask: [[String]],
});

const Model =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, RolesSchema);

export default Model;
