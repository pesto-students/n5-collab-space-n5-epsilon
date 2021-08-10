import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "SharedProjects";

const schema = new Schema({
  projectName: String,
  description: String,
  projectOwner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  projectGuests: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  taskLists: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasklists",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

const Model = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default Model;
