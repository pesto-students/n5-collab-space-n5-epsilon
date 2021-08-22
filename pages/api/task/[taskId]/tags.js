import {
  getTags,
  addTags,
  deleteTags,
} from "../../../../src/server/apiEndPoints";
import { createHandler } from "../../../../src/server/middleware";

const handler = createHandler();

handler.get(async (req, res) => {
  const taskId = req.query;
  if (!req.query)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await getTags(taskId);
  res.send(task);
});

handler.post(async (req, res) => {
  const { taskId } = req.query;

  const tagData = {
    taskId,
    tag: req.body.tag,
  };
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await addTags(tagData);
  res.send(task);
});

handler.delete(async (req, res) => {
  const { taskId } = req.query;
  const tagData = {
    taskId,
    tag: req.body.tag,
  };

  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const deletedTask = await deleteTags(tagData);
  res.send(deletedTask);
});

export default handler;
