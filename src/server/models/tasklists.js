import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "TaskLists";

const TaskListschema = new Schema({
  taskListName: String,
  projectId:{
    type: Schema.Types.ObjectId,
    ref: "Projects",
  },
});

TaskListschema.post("findOneAndDelete", async function (doc) {
  console.log(doc);

  if (doc) {
    const deleteResult = await mongoose.models["Task"].deleteMany({
      taskListId: doc._id,
    });

    console.log("Child delete result: ", deleteResult);
  }
});

const Model = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, TaskListschema);

export default Model;
