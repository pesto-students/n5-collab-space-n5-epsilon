// change naming as per convention

export const EDIT_TITLE = "EDIT_TITLE";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const GET_ALL_PROJECT = "GET_ALL_PROJECT";
export const ERROR_PROJECT = "ERROR_PROJECT";

export const EditTitle = (data) => ({
  type: UPDATE_PROJECT,
  payload: data,
});

export const CreateProject = (data) => ({
  type: CREATE_PROJECT,
  payload: data,
});

export const DeleteProject = (data) => ({
  type: DELETE_PROJECT,
  payload: data,
});
export const GetAllProject = (data) => ({
  type: GET_ALL_PROJECT,
  payload: data,
});

export const ErrorProject = (error) => {
  return {
    type: ERROR_PROJECT,
    error: error,
  };
};
