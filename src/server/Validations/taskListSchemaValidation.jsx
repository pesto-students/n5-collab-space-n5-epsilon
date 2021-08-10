import { validation } from "./validator";

const getTaskListInfoValidation = (data) => {
  const getTaskListInfo = {
    TaskListId: validation.objectId().required(),
  };
  return validation.validate(data, getTaskListInfo);
};

const insertTaskListValidation = (data) => {
  const insertTaskList = {
    TaskListName: validation.string().min(1).required(),
    description: validation.string(),
  };
  return validation.validate(data, insertTaskList);
};

const deleteTaskListValidation = (data) => {
  const deleteTaskList = {
    TaskListId: validation.objectId().required(),
  };
  return validation.validate(data, deleteTaskList);
};

export {
  getTaskListInfoValidation,
  insertTaskListValidation,
  deleteTaskListValidation,
};
