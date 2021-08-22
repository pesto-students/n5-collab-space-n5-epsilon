import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/taskLists";
import Task from "../models/tasks";
import TasksOrder from "../models/tasksOrder";
import Comments from "../models/comments";
import { model, Types } from "mongoose";

export async function addComment(commentData, projection = "", populate = "") {
  commentData.commentInfo.by = Types.ObjectId(commentData.commentInfo.by);
  const newComment = new Comments(commentData.commentInfo);
  const savedComment = await newComment.save();

  // let date = new Date();
  // const currentTime = date.toISOString();
  const addedComment = await Task.findOneAndUpdate(
    { _id: Types.ObjectId(commentData.taskId) },
    {
      $push: {
        comments: savedComment,
      },
    }
  ).exec();
  return addedComment;
}

export async function deleteComment(
  commentInfo,
  projection = "",
  populate = ""
) {
  try {
    const { commentId, taskId } = commentInfo;

    const removeFromTask = await Task.findOneAndUpdate(
      { _id: Types.ObjectId(taskId) },
      {
        $pull: {
          comments: {
            _id: Types.ObjectId(commentId),
          },
        },
      }
    ).exec();
    const deleteComment = await Comments.findOneAndDelete({
      _id: Types.ObjectId(commentId),
    }).exec();

    return deleteComment;
  } catch (error) {
    console.error(error);
  }
}
