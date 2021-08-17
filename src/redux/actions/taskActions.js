import {
  AddComment,
  AddCommentFailure,
  AddCommentSuccess,
  AddTag,
  AddTagFailure,
  AddTagSuccess,
  ChangeTaskOrder,
  ChangeTaskOrderFailure,
  ChangeTaskOrderSuccess,
  CreateTask,
  CreateTaskFailure,
  CreateTaskSuccess,
  DeleteTag,
  DeleteTagFailure,
  DeleteTagSuccess,
  DeleteTask,
  DeleteTaskFailure,
  DeleteTaskSuccess,
  MoveTask,
  MoveTaskFailure,
  MoveTaskSuccess,
  ReorderTask,
  ReorderTaskFailure,
  ReorderTaskSuccess,
  UpdateTaskName,
  UpdateTaskNameSuccess,
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
    taskInfo = { ...taskInfo, _id: Types.ObjectId().toString() };
    dispatch(CreateTask(taskInfo));
    let response = await taskURL.post("", taskInfo);
    if (response) {
      dispatch(CreateTaskSuccess(response.data));
    }
  } catch (err) {
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
      dispatch(ChangeTaskOrderFailure(prevState));
      toast.warn("Couldn't Connect to Server ");
    }
  } catch (err) {
    toast.warn("Couldn't Connect to Server ");
  }
};

export const updateTaskName = (updateTaskNameInfo) => async (dispatch) => {
  try {
    const { taskId, updateTaskName } = updateTaskNameInfo;
    dispatch(UpdateTaskName(updateTaskNameInfo));
    let response = await taskURL.put(`/${taskId}`, {
      data: { taskName: updateTaskName },
    });

    if (response) {
      dispatch(UpdateTaskNameSuccess(updateTaskNameInfo));
    }
  } catch (err) {
    dispatch(AddCommentFailure(err));
  }
};

export const addTags = (newTagInfo) => async (dispatch) => {
  try {
    dispatch(AddTag(newTagInfo));
    const { taskId } = newTagInfo;
    let response = await taskURL.post(`/${taskId}/tags`, newTagInfo);

    if (response) {
      dispatch(AddTagSuccess(newTagInfo));
    }
  } catch (err) {
    dispatch(AddTagFailure(err));
  }
};

export const deleteTags = (tagToBeDeletedInfo) => async (dispatch) => {
  try {
    const { taskId, tag } = tagToBeDeletedInfo;
    dispatch(DeleteTag(tagToBeDeletedInfo));
    let response = await taskURL.delete(`/${taskId}/tags`, {
      data: tagToBeDeletedInfo,
    });

    if (response) {
      dispatch(DeleteTagSuccess(tagToBeDeletedInfo));
    }
  } catch (err) {
    console.error(err);
    dispatch(DeleteTagFailure(err));
  }
};
