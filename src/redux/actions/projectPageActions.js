import { projectURL, taskListURL, taskURL } from "../../client_apis/configUrl";
import {
  GetProjectInfo,
  ErrorProject,
  DeleteProject,
  GetAllTasks,
  CreateTask,
  DeleteTask,
  MoveTask,
  CreateTaskList,
  DeleteTaskList
} from "../constants/projectActionConstants";
import axios from "axios";
export const getProjectInfo = (projectId) => async (dispatch, getState) => {
  // getState is to collect data from current state from store
  try {
    await projectURL
      .get(`/${projectId}`)
      .then((response) => {
        dispatch(GetProjectInfo(response.data));
      })
      .catch((error) => {
        let errorResponse = error;
        dispatch(ErrorProject(errorResponse));
      });
  } catch {}
};

// export const getAllTasksList = (taskListId) => async (dispatch) => {
//   let response = await taskListURL.get(`/${taskListId}`);
//   if (response) {
//     console.log(response);
//     dispatch(GetAllTasks(response.data));
//   }
// };

export const createNewTask = (taskInfo) => async (dispatch) => {
  const { taskListId } = taskInfo;
  let response = await taskURL.post("", taskInfo);
  if (response) {
    console.log(response.data);
    dispatch(CreateTask(response.data));
  }
};

export const createNewTaskList = (taskListInfo) => async (dispatch) => {
  let response = await taskListURL.post("", taskListInfo);
  if (response) {
    console.log(response.data);
    dispatch(CreateTaskList(response.data));
  }
};


export const deleteProject = (projectId) => async (dispatch) => {
  let response = await projectURL.delete("/", {
    data: projectId,
  });
  console.log("response", response);
  if (response) {
    console.log(projectId);
    dispatch(DeleteProject(projectId));
  }
};

export const deleteTask = (taskInfo) => async (dispatch) => {
  let response = await taskURL.delete("", { data: taskInfo });

  if (response) {
    dispatch(DeleteTask(taskInfo));
  }
};

export const deleteTaskList = (taskListInfo) => async (dispatch) => {
  let response = await taskListURL.delete("", { data: taskListInfo });

  if (response) {
    dispatch(DeleteTaskList(taskListInfo));
  }
};


export const moveTaskAction = (taskInfo) => async (dispatch) => {
  const { sourceTaskListId } = taskInfo;
  let response = await taskListURL.put(`/${sourceTaskListId}/move`, {
    data: taskInfo,
  });
  if (response) {
    dispatch(MoveTask(taskInfo));
  }
};
