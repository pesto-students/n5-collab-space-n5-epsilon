import {
  assignTask,
  getAllContributions,
} from "../../../../src/server/apiEndPoints";
import { createHandler } from "../../../../src/server/middleware";

const handler = createHandler();

handler.get(async (req, res) => {
  const projectId = req.query;
  if (!req.query)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const allContributions = await getAllContributions(projectId);
  res.send(allContributions);
});

handler.post(async (req, res) => {
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await assignTask(req.body);
  res.send(task);
});

export default handler;
