// export async function getProjects(db) {
//   return db.collection("projects").find().toArray();
// }
import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/taskLists";
import Task from "../models/tasks";
import Comments from "../models/comments";
import TasksOrder from "../models/tasksOrder";
import TaskListsOrder from "../models/taskListsOrder";

import { model, Types } from "mongoose";

export async function getTaskList(taskListInfo) {
  const taskLists = await TaskLists.find({
    _id: Types.ObjectId(taskListInfo.taskListId),
  });
  return taskLists;
}

export async function createTaskList(taskListInfo) {
  try {
    const newTaskList = new TaskLists(taskListInfo);
    const saveNewTaskLIst = await newTaskList.save();
    const newTaskListsOrder = await TaskListsOrder.updateOne(
      {
        projectId: Types.ObjectId(taskListInfo.projectId),
      },

      {
        $push: {
          taskListsOrder: saveNewTaskLIst._id,
        },
      }
    ).exec();
    console.log("saveNewTaskLIst._id", saveNewTaskLIst._id);
    const newTaskOrder = new TasksOrder({
      taskListsId: Types.ObjectId(saveNewTaskLIst._id),
      tasksOrder: [],
    });

    await newTaskOrder.save();
    const response = {
      _id: saveNewTaskLIst._id,
      task: {},
      taskListName: saveNewTaskLIst.taskListName,
      tasksOrder: [],
    };
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTaskList(taskListInfo) {
  const deletedTaskListId = await TaskLists.findOneAndDelete({
    _id: taskListInfo.taskListId,
  });
  const deletedTaskListOrderId = await TaskListsOrder.updateOne(
    {
      projectId: Types.ObjectId(taskListInfo.projectId),
    },
    {
      $pull: {
        taskListsOrder: taskListInfo.taskListId,
      },
    }
  ).exec();
  return deletedTaskListId;
}
