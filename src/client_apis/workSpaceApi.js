import axios from "axios";

export const urlBackEnd = process.env.REACT_APP_BACK_END_URL;

export const usersURL = axios.create({
  baseURL: `/api/users`,
});

export const projectURL = axios.create({
  baseURL: `/api/projects`,
});

export const taskListURL = axios.create({
  baseURL: `/api/taskList`,
});

export const taskURL = axios.create({
  baseURL: `/api/task`,
});