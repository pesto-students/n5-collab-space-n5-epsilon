import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/taskLists";
import Task from "../models/tasks";
import TasksOrder from "../models/tasksOrder";
import Comments from "../models/comments";
import { model, Types } from "mongoose";

export async function addTags(tagData, projection = "", populate = "") {
  const addedComment = await Task.findOneAndUpdate(
    { _id: Types.ObjectId(tagData.taskId) },
    {
      $push: {
        tags: tagData.tag,
      },
    }
  ).exec();
  return addedComment;
}

export async function deleteTags(tagData, projection = "", populate = "") {
  try {
    const { taskId, tag } = tagData;
    const deleteTag = await Task.findOneAndUpdate(
      { _id: Types.ObjectId(taskId) },
      {
        $pull: {
          tags: tag,
        },
      }
    ).exec();

    return deleteTag;
  } catch (error) {
    console.error(error);
  }
}
