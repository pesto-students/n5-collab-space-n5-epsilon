import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/taskLists";
import Task from "../models/tasks";
import Comments from "../models/comments";
import { model, Types } from "mongoose";

export async function getTaskInfo(taskInfo, projection = "", populate = "") {
  const task = await Task.find({ _id: Types.ObjectId(taskInfo.taskId) });
  return task;
}

export async function createTask(taskInfo, projection = "", populate = "") {
  taskInfo.taskListId = Types.ObjectId(taskInfo.taskListId);
  const newTask = new Task(taskInfo);
  let saveNewTask = await newTask.save();
  return saveNewTask;
}

export async function deleteTask(taskInfo, projection = "", populate = "") {
  const foundTask = Task.findOneAndDelete({ _id: taskInfo.taskId });
  return foundTask;
}

export async function updateTask(taskInfo, projection = "", populate = "") {
  const foundTask = Task.findOneAndUpdate({ _id: taskInfo.taskId });
  return foundTask;
}
export async function moveTask(taskInfo, projection = "", populate = "") {
  const foundTask = Task.findOneAndUpdate(
    { _id: taskInfo.taskId },
    {
      taskListId: Types.ObjectId(taskInfo.destinationTaskListId),
    }
  );
  return foundTask;
}
