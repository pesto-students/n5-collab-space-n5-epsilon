import { projectURL } from "../../client_apis/configUrl";
import {
  DeleteProject,
  DeleteProjectFailure,
  DeleteProjectSuccess,
} from "../constants/projectActionConstants";
import {
  GetAllProject,
  CreateProject,
  GetAllProjectSuccess,
  GetAllProjectFailure,
  CreateProjectSuccess,
  CreateProjectFailure,
} from "../constants/workspaceActionConstants";

export const getWorkspaceProject = () => async (dispatch, getState) => {
  // getState is to collect data from current state from store
  dispatch(GetAllProject({ loading: true }));
  try {
    await projectURL
      .get()
      .then((response) => {
        dispatch(GetAllProjectSuccess(response.data.projects));
      })
      .catch((error) => {
        let errorResponse = error;
        dispatch(GetAllProjectFailure(errorResponse));
      });
  } catch (err) {
    dispatch(ErrorProject(err));
  }
};

export const addNewProject = (newProject) => async (dispatch) => {
  try {
    dispatch(CreateProject(newProject));
    let response = await projectURL.post("/", newProject);
    if (response) {
      const data = response.data;
      const payload = {
        _id: data._id,
        projectName: data.projectName,
        description: response.data.description,
      };
      dispatch(CreateProjectSuccess(payload));
    }
  } catch (err) {
    dispatch(CreateProjectFailure(err));
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    dispatch(DeleteProject(projectId));
    let response = await projectURL.delete("/", {
      data: projectId,
    });
    console.log("response", response);
    if (response) {
      console.log(projectId);
      dispatch(DeleteProjectSuccess(projectId));
    }
  } catch (err) {
    dispatch(DeleteProjectFailure(err));
  }
};
