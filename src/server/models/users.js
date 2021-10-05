import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Users";

const schema = new Schema({
  userName: Number,
  ownProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Projects",
    },
  ],
  sharedProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "SharedProjects",
    },
  ],
});

const Model = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default Model;
