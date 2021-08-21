import { projectURL } from "../../client_apis/workSpaceApi";

import {
  GetProjectInfo,
  DeleteProject,
  GetProjectInfoFailure,
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
        response.data.userId = userId;
        dispatch(GetProjectInfo(response.data));
      }
    } catch (err) {
      dispatch(GetProjectInfoFailure(err));
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
