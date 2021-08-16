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
    res.status(500).send("Internal Server Error");
  }
});

handler.post(async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    const task = await createTask(req.body);
    res.send(task);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

handler.put(async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    const task = await updateTask(req.body);
    res.send(task);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

handler.delete(async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));

    const deletedTask = await deleteTask(req.body);
    res.send(deletedTask);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
