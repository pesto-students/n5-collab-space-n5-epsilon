import { getTaskInfo } from "../../../../src/server/apiEndPoints";
import { createHandler } from "../../../../src/server/middleware";

const handler = createHandler();

handler.get(async (req, res) => {
  const taskId = req.query;
  if (!req.query)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await getTaskInfo(taskId);
  res.send(task);
});

handler.post(async (req, res) => {
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await createTaskList(req.body);
  res.send(task);
});

handler.delete(async (req, res) => {
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const deletedTask = await deleteTaskList(req.body);
  res.send(deletedTask);
});

export default handler;
