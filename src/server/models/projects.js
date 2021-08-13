import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Projects";

const ProjectSchema = new Schema({
  projectName: String,
  description: String,
  projectOwner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

ProjectSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const deleteResult = await mongoose.models["TaskLists"].deleteMany({
      projectId: doc._id,
    });
  }
});
const Model =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, ProjectSchema);

export default Model;
