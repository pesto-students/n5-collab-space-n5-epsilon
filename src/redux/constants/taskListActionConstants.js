// change naming as per convention
export const GET_ALL_TASK_LISTS = "GET_ALL_TASK_LISTS";
export const GET_ALL_TASK_LISTS_SUCCESS = "GET_ALL_TASK_LISTS_SUCCESS";
export const GET_ALL_TASK_LISTS_FAILURE = "GET_ALL_TASK_LISTS_FAILURE";
export const CREATE_TASK_LIST = "CREATE_TASK_LIST";
export const CREATE_TASK_LIST_SUCCESS = "CREATE_TASK_LIST_SUCCESS";
export const CREATE_TASK_LIST_FAILURE = "CREATE_TASK_LIST_FAILURE";
export const CHANGE_TASK_LIST_ORDER = "CHANGE_TASK_LIST_ORDER";
export const CHANGE_TASK_LIST_ORDER_SUCCESS = "CHANGE_TASK_LIST_ORDER_SUCCESS";
export const CHANGE_TASK_LIST_ORDER_FAILURE = "CHANGE_TASK_LIST_ORDER_FAILURE";
export const MOVE_TASK_LIST = "MOVE_TASK_LIST";
export const MOVE_TASK_LIST_SUCCESS = "MOVE_TASK_LIST_SUCCESS";
export const MOVE_TASK_LIST_FAILURE = "MOVE_TASK_LIST_FAILURE";
export const DELETE_TASK_LIST = "DELETE_TASK_LIST";
export const DELETE_TASK_LIST_SUCCESS = "DELETE_TASK_LIST_SUCCESS";
export const DELETE_TASK_LIST_FAILURE = "DELETE_TASK_LIST_FAILURE";

export const GetAllTaskLists = (data) => ({
  type: GET_ALL_TASK_LISTS,
  payload: data,
});
export const GetAllTaskListsSuccess = (data) => ({
  type: GET_ALL_TASK_LISTS_SUCCESS,
  payload: data,
});
export const GetAllTaskListsFailure = (data) => ({
  type: GET_ALL_TASK_LISTS_FAILURE,
  payload: data,
});
export const CreateTaskList = (data) => ({
  type: CREATE_TASK_LIST,
  payload: data,
});
export const CreateTaskListSuccess = (data) => ({
  type: CREATE_TASK_LIST_SUCCESS,
  payload: data,
});
export const CreateTaskListFailure = (data) => ({
  type: CREATE_TASK_LIST_FAILURE,
  payload: data,
});
export const ChangeTaskListOrder = (data) => ({
  type: CHANGE_TASK_LIST_ORDER,
  payload: data,
});
export const ChangeTaskListOrderSuccess = (data) => ({
  type: CHANGE_TASK_LIST_ORDER_SUCCESS,
  payload: data,
});
export const ChangeTaskListOrderFailure = (data) => ({
  type: CHANGE_TASK_LIST_ORDER_FAILURE,
  payload: data,
});
export const MoveTaskList = (data) => ({
  type: MOVE_TASK_LIST,
  payload: data,
});
export const MoveTaskListSuccess = (data) => ({
  type: MOVE_TASK_LIST_SUCCESS,
  payload: data,
});
export const MoveTaskListFailure = (data) => ({
  type: MOVE_TASK_LIST_FAILURE,
  payload: data,
});
export const DeleteTaskList = (data) => ({
  type: DELETE_TASK_LIST,
  payload: data,
});
export const DeleteTaskListSuccess = (data) => ({
  type: DELETE_TASK_LIST_SUCCESS,
  payload: data,
});
export const DeleteTaskListFailure = (data) => ({
  type: DELETE_TASK_LIST_FAILURE,
  payload: data,
});
