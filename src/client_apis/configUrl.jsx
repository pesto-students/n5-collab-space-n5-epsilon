import axios from "axios";

export const urlBackEnd = process.env.BACK_END_URL;

console.log(urlBackEnd)

export const projectURL = axios.create({
  baseURL: `${urlBackEnd}/api/projects`,
});

export const taskListURL = axios.create({
  baseURL: `${urlBackEnd}/api/taskList`,
});

export const taskURL = axios.create({
  baseURL: `${urlBackEnd}/api/task`,
});
