import nextConnect from "next-connect";
import { getTaskList, createTask, deleteTask, createTaskList, deleteTaskList } from "../../../src/server/db";
import { createHandler } from "../../../src/server/middleware";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.body) return res.status(400).send("You must write something");
  const task = await createTaskList(req.body);
  res.send(task);
});

handler.delete(async (req, res) => {
  console.log(req);
  if (!req.body) return res.status(400).send("You must provide ProjectId");
  const deletedTask = await deleteTaskList(req.body);
  res.send(deletedTask);
});

export default handler;
