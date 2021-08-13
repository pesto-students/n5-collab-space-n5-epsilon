export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_FAILURE = "UPDATE_PROJECT_FAILURE";
export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_FAILURE = "ADD_PROJECT_FAILURE";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE";
export const GET_PROJECT_INFO = "GET_PROJECT_INFO";
export const GET_PROJECT_INFO_SUCCESS = "GET_PROJECT_INFO_SUCCESS";
export const GET_PROJECT_INFO_FAILURE = "GET_PROJECT_INFO_FAILURE";

export const UpdateProject = (data) => ({
  type: UPDATE_PROJECT,
  payload: data,
});
export const UpdateProjectSuccess = (data) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: data,
});
export const UpdateProjectFailure = (data) => ({
  type: UPDATE_PROJECT_FAILURE,
  payload: data,
});
export const AddProject = (data) => ({
  type: ADD_PROJECT,
  payload: data,
});
export const AddProjectSuccess = (data) => ({
  type: ADD_PROJECT_SUCCESS,
  payload: data,
});
export const AddProjectFailure = (data) => ({
  type: ADD_PROJECT_FAILURE,
  payload: data,
});
export const DeleteProject = (data) => ({
  type: DELETE_PROJECT,
  payload: data,
});
export const DeleteProjectSuccess = (data) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: data,
});
export const DeleteProjectFailure = (data) => ({
  type: DELETE_PROJECT_FAILURE,
  payload: data,
});
export const GetProjectInfo = (data) => ({
  type: GET_PROJECT_INFO,
  payload: data,
});
export const GetProjectInfoSuccess = (data) => ({
  type: GET_PROJECT_INFO_SUCCESS,
  payload: data,
});
export const GetProjectInfoFailure = (data) => ({
  type: GET_PROJECT_INFO_FAILURE,
  payload: data,
});
