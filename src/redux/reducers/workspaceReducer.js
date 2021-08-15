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
        console.log("payload", payload);
        draft.projects.push(payload);
        break;
        //return draft;
      }

      case DELETE_PROJECT: {
        const newDraft = original(draft);
        const some = newDraft.projects.findIndex(
          (project) => project._id == payload.projectId
        );
        draft.projects.splice(some, 1);
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
