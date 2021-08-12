import produce, { original } from "immer";
import {
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "../constants/projectActionConstants";
import {
  CREATE_PROJECT,
  GET_ALL_PROJECT,
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
      case CREATE_PROJECT: {
        draft.projects.push(payload);
        console.log("newState", JSON.parse(JSON.stringify(draft)));
        break;
        //return draft;
      }

      case DELETE_PROJECT: {
        const newDraft = original(draft);
        const some = newDraft.projects.findIndex(
          (project) => project._id == payload.projectId
        );
        console.log("this is index", some);
        draft.projects.splice(some, 1);
        console.log("newState", JSON.parse(JSON.stringify(draft)));
        break;
      }
      case GET_ALL_PROJECT: {
        draft.projects = payload;
        break;
      }
      default: {
        console.log("Came in draft");
        return draft;
      }
    }
  });
};

export default WorkSpaceReducer;
