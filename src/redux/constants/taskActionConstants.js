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

export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const UPDATE_TASK_DESCRIPTION = "UPDATE_TASK_DESCRIPTION";
export const UPDATE_TASK_DESCRIPTION_SUCCESS =
  "UPDATE_TASK_DESCRIPTION_SUCCESS";
export const UPDATE_TASK_DESCRIPTION_FAILURE =
  "UPDATE_TASK_DESCRIPTION_FAILURE";

export const UPDATE_TASK_NAME = "UPDATE_TASK_NAME";
export const UPDATE_TASK_NAME_SUCCESS = "UPDATE_TASK_NAME_SUCCESS";
export const UPDATE_TASK_NAME_FAILURE = "UPDATE_TASK_NAME_FAILURE";

export const ADD_TAG = "ADD_TAG";
export const ADD_TAG_SUCCESS = "ADD_TAG_SUCCESS";
export const ADD_TAG_FAILURE = "ADD_TAG_FAILURE";

export const DELETE_TAG = "DELETE_TAG";
export const DELETE_TAG_SUCCESS = "DELETE_TAG_SUCCESS";
export const DELETE_TAG_FAILURE = "DELETE_TAG_FAILURE";

export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

export const ASSIGN_TASK_TO = "ASSIGN_TASK_TO";
export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";
export const UPDATE_TASK_STATUS_SUCCESS = "UPDATE_TASK_STATUS_SUCCESS";
export const UPDATE_TASK_STATUS_FAILURE = "UPDATE_TASK_STATUS_FAILURE";

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

export const AddComment = (data) => ({
  type: ADD_COMMENT,
  payload: data,
});

export const AddCommentSuccess = (data) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: data,
});

export const AddCommentFailure = (data) => ({
  type: ADD_COMMENT_FAILURE,
  payload: data,
});

export const UpdateTaskDescription = (data) => ({
  type: UPDATE_TASK_DESCRIPTION,
  payload: data,
});

export const UpdateTaskDescriptionSuccess = (data) => ({
  type: UPDATE_TASK_DESCRIPTION_SUCCESS,
  payload: data,
});

export const UpdateTaskDescriptionFailure = (data) => ({
  type: UPDATE_TASK_DESCRIPTION_FAILURE,
  payload: data,
});

export const UpdateTaskName = (data) => ({
  type: UPDATE_TASK_NAME,
  payload: data,
});

export const UpdateTaskNameSuccess = (data) => ({
  type: UPDATE_TASK_NAME_SUCCESS,
  payload: data,
});

export const UpdateTaskNameFailure = (data) => ({
  type: UPDATE_TASK_NAME_FAILURE,
  payload: data,
});

export const AddTag = (data) => ({
  type: ADD_TAG,
  payload: data,
});

export const AddTagSuccess = (data) => ({
  type: ADD_TAG_SUCCESS,
  payload: data,
});

export const AddTagFailure = (data) => ({
  type: ADD_TAG_FAILURE,
  payload: data,
});

export const DeleteTag = (data) => ({
  type: DELETE_TAG,
  payload: data,
});

export const DeleteTagSuccess = (data) => ({
  type: DELETE_TAG_SUCCESS,
  payload: data,
});

export const DeleteTagFailure = (data) => ({
  type: DELETE_TAG_FAILURE,
  payload: data,
});
export const DeleteComment = (data) => ({
  type: DELETE_COMMENT,
  payload: data,
});

export const DeleteCommentSuccess = (data) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: data,
});

export const DeleteCommentFailure = (data) => ({
  type: DELETE_COMMENT_FAILURE,
  payload: data,
});

export const AssignTaskTo = (data) => ({
  type: ASSIGN_TASK_TO,
  payload: data,
});

export const UpdateTaskStatus = (data) => ({
  type: UPDATE_TASK_STATUS,
  payload: data,
});

export const UpdateTaskStatusSuccess = (data) => ({
  type: UPDATE_TASK_STATUS_SUCCESS,
  payload: data,
});

export const UpdateTaskStatusFailure = (data) => ({
  type: UPDATE_TASK_STATUS_FAILURE,
  payload: data,
});
