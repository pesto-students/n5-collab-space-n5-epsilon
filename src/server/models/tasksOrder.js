import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "TasksOrder";

const TasksOrderSchema = new Schema({
  taskListsId: {
    type: Schema.Types.ObjectId,
    ref: "TaskLists",
  },
  tasksOrder: [Schema.Types.ObjectId],
});

const Model =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, TasksOrderSchema, "tasks.order");

export default Model;
