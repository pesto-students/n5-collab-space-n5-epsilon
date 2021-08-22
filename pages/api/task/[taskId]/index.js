import { getTaskInfo, updateTask } from "../../../../src/server/apiEndPoints";
import { createHandler } from "../../../../src/server/middleware";

const handler = createHandler();

handler.get(async (req, res) => {
  const taskId = req.query;
  if (!req.query)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await getTaskInfo(taskId);
  res.send(task);
});

handler.put(async (req, res) => {
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await updateTask({
    taskId: req.query.taskId,
    updatedField: req.body.data,
  });
  res.send(task);
});

export default handler;
