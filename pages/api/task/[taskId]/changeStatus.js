import { updateTaskStatus } from "../../../../src/server/apiEndPoints";
import { createHandler } from "../../../../src/server/middleware";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await updateTaskStatus(req.body);
  res.send(task);
});

export default handler;
