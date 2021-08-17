import produce, { original } from "immer";
import {
  DELETE_PROJECT,
  GET_PROJECT_INFO,
  UPDATE_PROJECT,
} from "../constants/projectActionConstants";
import {
  ADD_TAG,
  CHANGE_TASK_ORDER,
  CREATE_TASK,
  DELETE_TAG,
  DELETE_TASK,
  GET_ALL_TASKS,
  MOVE_TASK,
  MOVE_TASK_FAILURE,
  UPDATE_TASK_NAME,
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
      case UPDATE_TASK_NAME: {
        const { taskId, taskListId, updateTaskName } = payload;
        draft.projectInfo.taskLists[taskListId].task[taskId].taskName =
          updateTaskName;
        break;
      }
      case ADD_TAG: {
        const { taskId, taskListId, tag } = payload;
        draft.projectInfo.taskLists[taskListId].task[taskId].tags.push(tag);
        break;
      }
      case DELETE_TAG: {
        const { taskId, taskListId, tag } = payload;
        const index =
          draft.projectInfo.taskLists[taskListId].task[taskId].tags.indexOf(
            tag
          );
        draft.projectInfo.taskLists[taskListId].task[taskId].tags.splice(
          index,
          1
        );
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
      default: {
        return draft;
      }
    }
  });
};

export default ProjectReducer;
