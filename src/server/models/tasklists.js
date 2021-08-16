import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "TaskLists";

const TaskListSchema = new Schema({
  taskListName: String,
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Projects",
  },
});

TaskListSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const deleteResult = await mongoose.models["Task"].deleteMany({
      taskListId: doc._id,
    });
  }
});

const Model =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, TaskListSchema);


  export default Model;
