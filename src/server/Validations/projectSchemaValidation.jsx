import { validation } from "./validator";

const getProjectInfoValidation = (data) => {
  const getProjectInfo = {
    projectId: validation.objectId().required(),
  };
  return validation.validate(data, getProjectInfo);
};

const insertProjectValidation = (data) => {
  const insertProject = {
    projectOwner: validation.objectId().required(),
    projectName: validation.string().min(1).required(),
    description: validation.string(),
  };
  return validation.validate(data, insertProject);
};

const deleteProjectValidation = (data) => {
  const deleteProject = {
    projectId: validation.objectId().required(),
  };
  return validation.validate(data, deleteProject);
};

export {
  getProjectInfoValidation,
  insertProjectValidation,
  deleteProjectValidation,
};
