import produce, { original } from "immer";
import {
  DELETE_PROJECT,
  GET_PROJECT_INFO,
  UPDATE_PROJECT,
} from "../constants/projectActionConstants";
import {
  CHANGE_TASK_ORDER,
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  MOVE_TASK,
  MOVE_TASK_FAILURE,
  REORDER_TASK_SUCCESS,
} from "../constants/taskActionConstants";
import {
  CREATE_TASK_LIST,
  CREATE_TASK_LIST_SUCCESS,
  DELETE_TASK_LIST,
} from "../constants/taskListActionConstants";

export const initialState = {
  projectInfo: {},
  loading: true,
};

function move(input, from, to) {
  let numberOfDeletedElm = 1;
  const elm = input.splice(from, numberOfDeletedElm)[0];
  numberOfDeletedElm = 0;
  input.splice(to, numberOfDeletedElm, elm);
  return input;
}

const ProjectReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_PROJECT: {
        const index = draft.findIndex((project) => project._id === payload._id);
        return (draft[index] = payload);
      }
      case GET_ALL_TASKS: {
        draft.projectInfo.taskLists = payload;
        break;
      }
      case CREATE_TASK: {
        const { _id, taskListId } = payload;
        draft.projectInfo.taskLists[taskListId].task[_id] = payload;
        draft.projectInfo.taskLists[taskListId].tasksOrder.push(_id);
        break;
      }
      case CREATE_TASK_LIST_SUCCESS: {
        draft.projectInfo.taskLists[payload._id] = payload;
        draft.projectInfo.taskListsOrder.push(payload._id);
        break;
      }

      case DELETE_PROJECT: {
        const newDraft = original(draft);
        delete newDraft[1];
        return newDraft;
      }
      case DELETE_TASK: {
        const { taskListId, taskId } = payload;
        delete draft.projectInfo.taskLists[taskListId].task[taskId];
        const taskOrderIndex =
          draft.projectInfo.taskLists[taskListId].tasksOrder.indexOf(taskId);
        draft.projectInfo.taskLists[taskListId].tasksOrder.splice(
          taskOrderIndex,
          1
        );
        break;
      }

      case DELETE_TASK_LIST: {
        const taskListId = payload.taskListId;
        delete draft.projectInfo.taskLists[taskListId];
        const taskListOrderIndex =
          draft.projectInfo.taskListsOrder.indexOf(taskListId);
        draft.projectInfo.taskListsOrder.splice(taskListOrderIndex, 1);
        break;
      }
      case GET_PROJECT_INFO: {
        draft.projectInfo = payload;
        break;
      }
      case CHANGE_TASK_ORDER: {
        const { initialIndex, finalIndex, taskListId, tasksOrder } = payload;
        draft.projectInfo.taskLists[taskListId].tasksOrder = tasksOrder;
        break;
      }

      case MOVE_TASK_FAILURE: {
        return payload;
      }
      case MOVE_TASK: {
        const {
          taskId,
          initialIndex,
          finalIndex,
          sourceTaskListId,
          destinationTaskListId,
          sourceTaskOrder,
          destinationTaskOrder,
        } = payload;

        draft.projectInfo.taskLists[sourceTaskListId].tasksOrder =
          sourceTaskOrder;
        draft.projectInfo.taskLists[destinationTaskListId].tasksOrder =
          destinationTaskOrder;
        draft.projectInfo.taskLists[destinationTaskListId].task[taskId] =
          draft.projectInfo.taskLists[sourceTaskListId].task[taskId];
        delete draft.projectInfo.taskLists[sourceTaskListId].task[taskId];
        break;
      }
      case REORDER_TASK_SUCCESS: {
        const { taskListId, initialIndex, finalIndex } = payload;
        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default ProjectReducer;
