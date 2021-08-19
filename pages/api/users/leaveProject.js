import { removeUserFoProject } from "../../../src/server/apiEndPoints";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.post(async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { userId, projectId } = req.body;
    if (userId && projectId) {
      const removedUser = await removeUserFoProject(req.body);
      res.send(removedUser);
    } else {
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(JSON.stringify({ error: "Invalid Request" }));
  }
});

export default handler;
