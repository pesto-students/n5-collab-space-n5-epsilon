import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "TaskListsOrder";

const TaskListsOrderSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "projects",
  },
  taskListsOrder: [Schema.Types.ObjectId],
});

const Model =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, TaskListsOrderSchema, "tasklists.order");

export default Model;
