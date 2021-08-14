export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const GET_ALL_TASKS_SUCCESS = "GET_ALL_TASKS_SUCCESS";
export const GET_ALL_TASKS_FAILURE = "GET_ALL_TASKS_FAILURE";
export const CREATE_TASK = "CREATE_TASK";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE";
export const CHANGE_TASK_ORDER = "CHANGE_TASK_ORDER";
export const CHANGE_TASK_ORDER_SUCCESS = "CHANGE_TASK_ORDER_SUCCESS";
export const CHANGE_TASK_ORDER_FAILURE = "CHANGE_TASK_ORDER_FAILURE";
export const MOVE_TASK = "MOVE_TASK";
export const MOVE_TASK_SUCCESS = "MOVE_TASK_SUCCESS";
export const MOVE_TASK_FAILURE = "MOVE_TASK_FAILURE";
export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";

export const GetAllTasks = (data) => ({
  type: GET_ALL_TASKS,
  payload: data,
});
export const GetAllTasksSuccess = (data) => ({
  type: GET_ALL_TASKS_SUCCESS,
  payload: data,
});
export const GetAllTasksFailure = (data) => ({
  type: GET_ALL_TASKS_FAILURE,
  payload: data,
});
export const CreateTask = (data) => ({
  type: CREATE_TASK,
  payload: data,
});
export const CreateTaskSuccess = (data) => ({
  type: CREATE_TASK_SUCCESS,
  payload: data,
});
export const CreateTaskFailure = (data) => ({
  type: CREATE_TASK_FAILURE,
  payload: data,
});
export const ChangeTaskOrder = (data) => ({
  type: CHANGE_TASK_ORDER,
  payload: data,
});
export const ChangeTaskOrderSuccess = (data) => ({
  type: CHANGE_TASK_ORDER_SUCCESS,
  payload: data,
});
export const ChangeTaskOrderFailure = (data) => ({
  type: tasksOrder,
  payload: data,
});
export const MoveTask = (data) => ({
  type: MOVE_TASK,
  payload: data,
});
export const MoveTaskSuccess = (data) => ({
  type: MOVE_TASK_SUCCESS,
  payload: data,
});
export const MoveTaskFailure = (data) => ({
  type: MOVE_TASK_FAILURE,
  payload: data,
});
export const DeleteTask = (data) => ({
  type: DELETE_TASK,
  payload: data,
});
export const DeleteTaskSuccess = (data) => ({
  type: DELETE_TASK_SUCCESS,
  payload: data,
});
export const DeleteTaskFailure = (data) => ({
  type: DELETE_TASK_FAILURE,
  payload: data,
});
