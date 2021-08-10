import { projectURL } from "../../client_apis/configUrl";
import {
  AddProject,
  ErrorProject,
  DeleteProject,
  GetAllProject,
  CreateProject
} from "../constants/workspaceActionConstants";

export const getWorkspaceProject = () => async (dispatch, getState) => {
  // getState is to collect data from current state from store
  try {
    await projectURL
      .get()
      .then((response) => {
        dispatch(GetAllProject(response.data.projects));
      })
      .catch((error) => {
        let errorResponse = error;
        dispatch(ErrorProject(errorResponse));
      });
  } catch {}
};

export const addNewProject = (newProject) => async (dispatch) => {
  let response = await projectURL.post('/', newProject);
  if (response) {
    const data = response.data
    const payload = {_id:data._id,projectName:data.projectName,description:response.data.description}
    dispatch(CreateProject(payload));
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  let response = await projectURL.delete('/', {
    data:  projectId ,
  });
  console.log("response",response)
  if (response) {
    console.log(projectId)
    dispatch(DeleteProject(projectId));
  }
};
