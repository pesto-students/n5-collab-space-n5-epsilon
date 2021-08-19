import produce, { original } from "immer";
import {
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "../constants/projectActionConstants";
import {
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SUCCESS,
  LEAVE_PROJECT,
} from "../constants/workspaceActionConstants";

export const initialState = {
  projects: [],
  sharedProjects: [],
  loading: true,
};

const WorkSpaceReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_PROJECT: {
        const index = draft.findIndex((project) => project._id === payload._id);
        return (draft[index] = payload);
      }
      case CREATE_PROJECT_SUCCESS: {
        draft.projects.push(payload);
        break;
      }

      case DELETE_PROJECT: {
        const newDraft = original(draft);
        const projectIndex = newDraft.projects.findIndex(
          (project) => project._id == payload.projectId
        );
        draft.projects.splice(projectIndex, 1);
        break;
      }
      case LEAVE_PROJECT: {
        const projectIndex = draft.projects.findIndex(
          (project) => project._id == payload.projectId
        );
        draft.projects.splice(projectIndex, 1);
        break;
      }
      case GET_ALL_PROJECT_SUCCESS: {
        draft.projects = payload;
        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default WorkSpaceReducer;
