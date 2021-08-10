import { validation } from "./validator";

const updateWorkSpaceNameValidation = (data) => {
  const updateWorkSpaceNameValidation = {
    workSpaceName: validation.string().min(1).required(),
    userId: validation.objectId().required(),
  };
  return validation.validate(data, updateWorkSpaceNameValidation);
};

export { updateWorkSpaceNameValidation };
