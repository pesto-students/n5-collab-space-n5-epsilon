import { projectURL } from "../../client_apis/configUrl";

import {
  GetProjectInfo,
  ErrorProject,
  DeleteProject,
} from "../constants/projectActionConstants";

export const getProjectInfo = (projectId) => async (dispatch, getState) => {
  try {
    // getState is to collect data from current state from store
    const response = await projectURL.get(`/${projectId}`);
    if (response) {
      dispatch(GetProjectInfo(response.data));
    }
  } catch (err) {
    dispatch(ErrorProject(err));
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    let response = await projectURL.delete("/", {
      data: projectId,
    });
    if (response) {
      dispatch(DeleteProject(projectId));
    }
  } catch (err) {
    dispatch(ErrorProject(err));
  }
};
