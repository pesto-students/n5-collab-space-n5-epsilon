const validation = require("@hapi/joi");

const signUp_UserValidation = (data) => {
  const signUp_User = {
    name: validation.string().min(4).required(),
    email: validation.string().min(5).required().email(),
    password: validation.string().min(6).required(),
  };
  return validation.validate(data, signUp_User);
};

const login_UserValidation = (data) => {
  const login_User = {
    email: validation.string().min(5).required().email(),
    password: validation.string().min(6).required(),
  };
  return validation.validate(data, login_User);
};

export { signUp_UserValidation, login_UserValidation };
