import { createTask, deleteTask } from "../../../src/server/db";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  const { taskListId } = req.query;
  const projects = await getTaskinfo(taskListId);
  res.send(projects);
});

handler.post(async (req, res) => {
  if (!req.body) return res.status(400).send("You must write something");
  const task = await createTask(req.body);
  res.send(task);
});

handler.put(async (req, res) => {
  if (!req.body) return res.status(400).send("You must write something");
  const task = await updateTask(req.body);
  res.send(task);
});

handler.delete(async (req, res) => {
  console.log(req);
  if (!req.body) return res.status(400).send("You must provide ProjectId");

  const deletedTask = await deleteTask(req.body);
  res.send(deletedTask);
});

export default handler;
