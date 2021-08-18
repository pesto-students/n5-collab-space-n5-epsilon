export const EDIT_TITLE = "EDIT_TITLE";
export const EDIT_TITLE_SUCCESS = "EDIT_TITLE_SUCCESS";
export const EDIT_TITLE_FAILURE = "EDIT_TITLE_FAILURE";

export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";

export const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE";

export const GET_ALL_PROJECT = "GET_ALL_PROJECT";
export const GET_ALL_PROJECT_SUCCESS = "GET_ALL_PROJECT_SUCCESS";
export const GET_ALL_PROJECT_FAILURE = "GET_ALL_PROJECT_FAILURE";

export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

export const EditTitle = (data) => ({
  type: EDIT_TITLE,
  payload: data,
});
export const EditTitleSuccess = (data) => ({
  type: EDIT_TITLE_SUCCESS,
  payload: data,
});
export const EditTitleFailure = (data) => ({
  type: EDIT_TITLE_FAILURE,
  payload: data,
});
export const CreateProject = (data) => ({
  type: CREATE_PROJECT,
  payload: data,
});
export const CreateProjectSuccess = (data) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: data,
});
export const CreateProjectFailure = (data) => ({
  type: CREATE_PROJECT_FAILURE,
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
export const GetAllProject = (data) => ({
  type: GET_ALL_PROJECT,
  payload: data,
});
export const GetAllProjectSuccess = (data) => ({
  type: GET_ALL_PROJECT_SUCCESS,
  payload: data,
});
export const GetAllProjectFailure = (data) => ({
  type: GET_ALL_PROJECT_FAILURE,
  payload: data,
});

export const AddUser = (data) => ({
  type: ADD_USER,
  payload: data,
});

export const AddUserSuccess = (data) => ({
  type: ADD_USER_SUCCESS,
  payload: data,
});

export const AddUserFailure = (data) => ({
  type: ADD_USER_FAILURE,
  payload: data,
});
