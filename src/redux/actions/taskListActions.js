import { taskListURL } from "../../client_apis/workSpaceApi";
import {
  CreateTaskList,
  CreateTaskListFailure,
  CreateTaskListSuccess,
  DeleteTaskList,
  DeleteTaskListFailure,
  DeleteTaskListSuccess,
} from "../constants/taskListActionConstants";

export const createNewTaskList = (taskListInfo) => async (dispatch) => {
  try {
    //dispatch(CreateTaskList(taskListInfo));
    let response = await taskListURL.post("", taskListInfo);
    if (response) {
      dispatch(CreateTaskListSuccess(response.data));
    }
  } catch (err) {
    console.log(err);
    dispatch(CreateTaskListFailure(err));
  }
};

export const deleteTaskList = (taskListInfo) => async (dispatch) => {
  try {
    dispatch(DeleteTaskList(taskListInfo));
    let response = await taskListURL.delete("", { data: taskListInfo });

    if (response) {
      dispatch(DeleteTaskListSuccess(taskListInfo));
    }
  } catch (err) {
    dispatch(DeleteTaskListFailure(err));
  }
};
