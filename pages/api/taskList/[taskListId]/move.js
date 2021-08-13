import { moveTask } from "../../../../src/server/apiEndPoints";

import { createHandler } from "../../../../src/server/middleware";
const handler = createHandler();

handler.put(async (req, res) => {
  console.log("req.body", req.body);
  if (!req.body)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const task = await moveTask(req.body.data);
  res.send(task);
});

export default handler;
