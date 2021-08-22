import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/taskLists";
import Task from "../models/tasks";
import TasksOrder from "../models/tasksOrder";
import Comments from "../models/comments";
import { model, Types } from "mongoose";

export async function getTaskInfo(taskInfo, projection = "", populate = "") {
  const task = await Task.aggregate([
    {
      $match: {
        _id: Types.ObjectId(taskInfo.taskId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.by",
        foreignField: "_id",
        as: "userLookup",
      },
    },
  ]);
  return task;
}

export async function createTask(taskInfo, projection = "", populate = "") {
  const taskListsId = taskInfo.taskListId;
  taskInfo.taskListId = Types.ObjectId(taskListsId);
  const newTask = new Task(taskInfo);
  let saveNewTask = await newTask.save();
  await TasksOrder.updateOne(
    { taskListsId },
    {
      $push: {
        tasksOrder: newTask._id,
      },
    }
  ).exec();
  return saveNewTask;
}

export async function deleteTask(taskInfo, projection = "", populate = "") {
  const foundTask = Task.findOneAndDelete({ _id: taskInfo.taskId });
  const updatedTaskOrder = TasksOrder.updateOne(
    {
      taskListId: taskInfo.taskListId,
    },
    {
      $pull: {
        tasksOrder: taskInfo.taskId,
      },
    }
  ).exec();
  return foundTask;
}

export async function updateTask(taskInfo, projection = "", populate = "") {
  const { taskId, updatedField } = taskInfo;

  const foundTask = Task.findOneAndUpdate(
    { _id: Types.ObjectId(taskId) },
    updatedField,
    { new: true }
  );
  return foundTask;
}
export async function moveTask(taskInfo, projection = "", populate = "") {
  const {
    taskId,
    sourceTaskListId,
    destinationTaskListId,
    sourceTaskOrder,
    destinationTaskOrder,
  } = taskInfo;
  const convertedSourceTaskOrder = sourceTaskOrder.map((id) =>
    Types.ObjectId(id)
  );
  const convertedDestinationTaskOrder = destinationTaskOrder.map((id) =>
    Types.ObjectId(id)
  );
  const foundTask = await Task.findOneAndUpdate(
    { _id: Types.ObjectId(taskId) },
    {
      taskListId: Types.ObjectId(destinationTaskListId),
    }
  ).exec();
  const reorderSource = await TasksOrder.findOneAndUpdate(
    { taskListsId: Types.ObjectId(sourceTaskListId) },
    { tasksOrder: convertedSourceTaskOrder }
  ).exec();
  const reorderDestination = await TasksOrder.findOneAndUpdate(
    { taskListsId: Types.ObjectId(destinationTaskListId) },
    { tasksOrder: convertedDestinationTaskOrder }
  ).exec();
  return foundTask;
}
export async function reorderTask(taskInfo, projection = "", populate = "") {
  const foundTask = TasksOrder.findOneAndUpdate(
    { taskListsId: taskInfo.taskListId },
    {
      tasksOrder: taskInfo.tasksOrder,
    }
  );
  return foundTask;
}
