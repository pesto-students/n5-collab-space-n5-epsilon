import {
  ChangeTaskOrder,
  ChangeTaskOrderFailure,
  ChangeTaskOrderSuccess,
  CreateTask,
  CreateTaskFailure,
  CreateTaskSuccess,
  DeleteTask,
  DeleteTaskFailure,
  DeleteTaskSuccess,
  MoveTask,
  MoveTaskFailure,
  MoveTaskSuccess,
  ReorderTask,
  ReorderTaskFailure,
  ReorderTaskSuccess,
} from "../constants/taskActionConstants";
import { toast } from "react-toastify";
import { taskListURL, taskURL } from "../../client_apis/workSpaceApi";
import { Types } from "mongoose";
var moveInArray = function (arr, from, to) {
  // Make sure a valid array is provided

  // Delete the item from it's current position
  var item = arr.splice(from, 1);

  // Move the item to its new position
  arr.splice(to, 0, item[0]);
  return arr;
};
export const createNewTask = (taskInfo) => async (dispatch) => {
  try {
    taskInfo._id = Types.ObjectId().toString();
    dispatch(CreateTask(taskInfo));
    let response = await taskURL.post("", taskInfo);
    if (response) {
      dispatch(CreateTaskSuccess(response.data));
    }
  } catch (err) {
    console.log("this is error", err);
    dispatch(CreateTaskFailure(err));
  }
};
export const deleteTask = (taskInfo) => async (dispatch) => {
  try {
    dispatch(DeleteTask(taskInfo));
    let response = await taskURL.delete("", { data: taskInfo });

    if (response) {
      dispatch(DeleteTaskSuccess(taskInfo));
    }
  } catch (err) {
    dispatch(DeleteTaskFailure(err));
  }
};

export const moveTaskAction = (taskInfo) => async (dispatch, getState) => {
  const prevState = getState().ProjectReducer;
  const {
    taskId,
    sourceTaskListId,
    destinationTaskListId,
    initialIndex,
    finalIndex,
  } = taskInfo;
  let { sourceTaskOrder, destinationTaskOrder } = taskInfo;
  const item = sourceTaskOrder[initialIndex];
  taskInfo.sourceTaskOrder.splice(initialIndex, 1);
  taskInfo.destinationTaskOrder.splice(finalIndex, 0, item);
  try {
    const { sourceTaskListId } = taskInfo;
    dispatch(MoveTask(taskInfo));
    let response = await taskListURL.put(`/${sourceTaskListId}/move`, {
      data: taskInfo,
    });
    if (response) {
      dispatch(MoveTaskSuccess(taskInfo));
      toast.success("Task Moved ");
    }
  } catch (err) {
    dispatch(MoveTaskFailure(prevState));
    toast.warn("Couldn't Connect to Server ");
  }
};

export const reorderTask = (taskInfo) => async (dispatch, getState) => {
  try {
    const prevState = getState().ProjectReducer;
    const { taskListId, initialIndex, finalIndex } = taskInfo;
    let { tasksOrder } = taskInfo;
    tasksOrder = moveInArray(tasksOrder, initialIndex, finalIndex);
    taskInfo.tasksOrder = tasksOrder;
    try {
      dispatch(ChangeTaskOrder(taskInfo));
      let response = await taskListURL.put(`/${taskListId}/reorder`, {
        data: taskInfo,
      });
      if (response) {
        dispatch(ChangeTaskOrderSuccess(taskInfo));
        toast.success("Task Moved ");
      }
    } catch (err) {
      console.log(err);
      dispatch(ChangeTaskOrderFailure(prevState));
      toast.warn("Couldn't Connect to Server ");
    }
  } catch (err) {
    console.log(err);
    toast.warn("Couldn't Connect to Server ");
  }
};
