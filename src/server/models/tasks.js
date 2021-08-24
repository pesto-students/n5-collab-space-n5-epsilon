import mongoose, { Schema } from "mongoose";
import users from "./userData";
const MODEL_NAME = "Task";

const schema = new Schema({
  taskName: String,
  status: String,
  taskListId: {
    type: Schema.Types.ObjectId,
    ref: "TaskLists",
  },
  tags: [String],
  comments: [Object],
  description: String,
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Model = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default Model;
