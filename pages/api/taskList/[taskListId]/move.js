import nextConnect from "next-connect";
import { moveTask } from "../../../../src/server/db";

import { createHandler } from "../../../../src/server/middleware";
//import { middleware as handler} from "../../../middleware/database";

// const handler = nextConnect();

// handler.use(middleware);
const handler = createHandler();

handler.put(async (req, res) => {
  if (!req.body) return res.status(400).send("You must write something");
  const task = await moveTask(req.body.data);
  res.send(task);
});


export default handler;
