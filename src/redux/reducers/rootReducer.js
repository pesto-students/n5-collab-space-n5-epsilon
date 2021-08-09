import { combineReducers } from "redux";
import WorkSpaceReducer from "./workspaceReducer";
import ProjectReducer from "./projectReducer"
import { HYDRATE } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  WorkSpaceReducer,
  ProjectReducer
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;
