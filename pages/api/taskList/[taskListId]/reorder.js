import { moveTask, reorderTask } from "../../../../src/server/apiEndPoints";

import { createHandler } from "../../../../src/server/middleware";
const handler = createHandler();

handler.put(async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    const task = await reorderTask(req.body.data);
    res.send(task);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
