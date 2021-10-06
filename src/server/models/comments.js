import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Comments";

const CommentSchema = new Schema({
  commentText: String,
  by: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Schema.Types.Date,
  },
});
CommentSchema.pre("save", function (next) {
  var comment = this;
  comment.createdAt = comment.createdAt || new Date();
  next();
});

const Model =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, CommentSchema);

export default Model;
