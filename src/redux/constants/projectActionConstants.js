// change naming as per convention

export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const ADD_PROJECT = "ADD_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const GET_PROJECT_INFO = "GET_PROJECT_INFO";
export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const ERROR_PROJECT = "ERROR_PROJECT";
export const CREATE_TASK  = "CREATE_TASK"
export const CREATE_TASK_LIST  = "CREATE_TASK_LIST"
export const CHANGE_TASK_ORDER  = "CHANGE_TASK_ORDER"
export const MOVE_TASK  = "MOVE_TASK"
export const DELETE_TASK  = "DELETE_TASK"
export const DELETE_TASK_LIST  = "DELETE_TASK_LIST"
export const LOADING = "LOADING"

export const UpdateProject = (data) => ({
  type: UPDATE_PROJECT,
  payload: data,
});

export const AddUser = (data) => ({
  type: ADD_USER,
  payload: data,
});

export const DeleteUser = (data) => ({
  type: DELETE_USER,
  payload: data,
});
export const GetProjectInfo = (data) => ({
  type: GET_PROJECT_INFO,
  payload: data,
});

export const GetAllTasks = (data) => ({
  type: GET_ALL_TASKS,
  payload: data,
});
export const ErrorProject = (error) => {
  return {
    type: ERROR_PROJECT,
    error: error,
  };
};

export const CreateTask = (data) => {
  return {
    type: CREATE_TASK,
    payload:data
  };
};

export const CreateTaskList = (data) => {
  return {
    type: CREATE_TASK_LIST,
    payload:data
  };
};


export const DeleteTask = (data) => {
  return {
    type: DELETE_TASK,
    payload:data
  };
};

export const DeleteTaskList = (data) => {
  return {
    type: DELETE_TASK_LIST,
    payload:data
  };
};

export const ChangeTaskOrder = (data) => {
  return {
    type: CHANGE_TASK_ORDER,
    payload:data
  };
};

export const MoveTask = (data) => {
  return {
    type: MOVE_TASK,
    payload:data
  };
};
export const Loading = () => {
  return {
    type: LOADING,
  };
};
