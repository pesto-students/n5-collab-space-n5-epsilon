import { validation } from "./validator";

const getTaskInfoValidation = (data) => {
  const getTaskInfo = {
    TaskId: validation.objectId().required(),
  };
  return validation.validate(data, getTaskInfo);
};

const insertTaskValidation = (data) => {
  const insertTask = {
    TaskName: validation.string().min(1).required(),
    description: validation.string(),
  };
  return validation.validate(data, insertTask);
};

const deleteTaskValidation = (data) => {
  const deleteTask = {
    TaskId: validation.objectId().required(),
  };
  return validation.validate(data, deleteTask);
};

export {
  getTaskInfoValidation,
  insertTaskValidation,
  deleteTaskValidation,
};
