import { Types } from "mongoose";
import { projectURL, usersURL } from "../../client_apis/workSpaceApi";
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
  AddUser,
  AddUserSuccess,
  AddUserFailure,
  LeaveProject,
  LeaveProjectSuccess,
  LeaveProjectFailure,
} from "../constants/workspaceActionConstants";

export const getWorkspaceProject = (req) => async (dispatch, getState) => {
  // getState is to collect data from current state from store
  const { userId, token } = req.cookies;
  dispatch(GetAllProject({ loading: true }));
  try {
    await projectURL
      .get("", { params: { userId, token } })
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
    let response = await projectURL.post("/", newProject);
    if (response) {
      const payload = response.data;
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
    if (response) {
      dispatch(DeleteProjectSuccess(projectId));
    }
  } catch (err) {
    dispatch(DeleteProjectFailure(err));
  }
};

export const addUser = (inviteUserInfo) => async (dispatch) => {
  try {
    const { projectId } = inviteUserInfo;
    let response = await usersURL.get("/inviteUser", {
      params: inviteUserInfo,
    });
    if (response) {
      dispatch(AddUserSuccess(response));
    }
  } catch (err) {
    dispatch(AddUserFailure(err));
  }
};

export const leaveProject = (leaveProjectInfo) => async (dispatch) => {
  try {
    //dispatch(LeaveProject(leaveProjectInfo));
    let response = await usersURL.post("/leaveProject", leaveProjectInfo);
    if (response) {
      dispatch(LeaveProject(leaveProjectInfo));
    }
  } catch (err) {
    dispatch(LeaveProjectFailure(err));
  }
};
