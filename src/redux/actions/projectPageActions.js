import { projectURL } from "../../client_apis/workSpaceApi";

import {
  GetProjectInfo,
  ErrorProject,
  DeleteProject,
} from "../constants/projectActionConstants";

export const getProjectInfo =
  ({ projectId, cookies }) =>
  async (dispatch, getState) => {
    try {
      // getState is to collect data from current state from store
      const { userId, token } = cookies;
      const response = await projectURL.get(`/${projectId}`, {
        params: {
          userId,
          token,
        },
      });
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
