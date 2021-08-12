import {
  CreateTask,
  CreateTaskFailure,
  CreateTaskSuccess,
  DeleteTaskFailure,
  DeleteTaskSuccess,
  MoveTask,
  MoveTaskFailure,
  MoveTaskSuccess,
} from "../constants/taskActionConstants";

export const createNewTask = (taskInfo) => async (dispatch) => {
  try {
    dispatch(CreateTask(response.data));
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

export const moveTaskAction = (taskInfo) => async (dispatch) => {
  try {
    const { sourceTaskListId } = taskInfo;
    dispatch(MoveTask(taskInfo));
    let response = await taskListURL.put(`/${sourceTaskListId}/move`, {
      data: taskInfo,
    });
    if (response) {
      dispatch(MoveTaskSuccess(taskInfo));
    }
  } catch (err) {
    dispatch(MoveTaskFailure(err));
  }
};
