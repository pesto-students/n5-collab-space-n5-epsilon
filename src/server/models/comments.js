import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Comments";

const schema = new Schema({
  comment: String,
  by: {
    type: Schema.Types.ObjectId,
    ref: "projects",
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "projects",
  },
});

const Model = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default Model;
