import mongoose, { Schema } from "mongoose";

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
});

const Model = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default Model;
