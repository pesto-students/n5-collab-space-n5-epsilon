import Axios from "axios";

export const urlBackEnd = process.env.BACK_END_URL;

export const usersURL = Axios.create({
  baseURL: `${urlBackEnd}/api/users`,
});

export const projectURL = Axios.create({
  baseURL: `${urlBackEnd}/api/projects`,
});

export const taskListURL = Axios.create({
  baseURL: `${urlBackEnd}/api/taskList`,
});

export const taskURL = Axios.create({
  baseURL: `${urlBackEnd}/api/task`,
});