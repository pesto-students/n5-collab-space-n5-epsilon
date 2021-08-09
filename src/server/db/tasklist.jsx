// export async function getProjects(db) {
//   return db.collection("projects").find().toArray();
// }
import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/tasklists";
import Task from "../models/tasks";
import Comments from "../models/comments";
import { model, Types } from "mongoose";

export async function getTaskList(taskListInfo) {
  const taskLists = await TaskLists.find({
    _id: Types.ObjectId(taskListInfo.taskListId),
  });
  return taskLists;
}

export async function createTaskList(taskListInfo) {
  const newTaskList = new TaskLists(taskListInfo);
  const saveNewTaskLIst = await newTaskList.save();
  return saveNewTaskLIst;
}

export async function deleteTaskList(taskListInfo) {
  const deletedTaskListId = await TaskLists.findOneAndDelete({
    _id: taskListInfo.taskListId,
  });
  return deletedTaskListId;
}
