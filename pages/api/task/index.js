import { createTask, deleteTask } from "../../../src/server/apiEndPoints";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  try {
    if (!req.query)
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    const { taskListId } = req.query;
    const taskInfo = await getTaskInfo(taskListId);
    res.send(taskInfo);
  } catch (error) {
    console.log(error);
  }
});

handler.post(async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    const task = await createTask(req.body);
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

handler.put(async (req, res) => {
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await updateTask(req.body);
  res.send(task);
});

handler.delete(async (req, res) => {
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));

  const deletedTask = await deleteTask(req.body);
  res.send(deletedTask);
});

export default handler;
