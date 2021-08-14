import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Contributions";

const ContributionSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Projects",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "UserData",
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Roles",
  },
});

const Model =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, ContributionSchema);

export default Model;
