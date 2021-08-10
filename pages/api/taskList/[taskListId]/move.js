import { moveTask } from "../../../../src/server/db";

import { createHandler } from "../../../../src/server/middleware";

const handler = createHandler();

handler.put(async (req, res) => {
  if (!req.body) return res.status(400).send("You must write something");
  const task = await moveTask(req.body.data);
  res.send(task);
});

export default handler;
