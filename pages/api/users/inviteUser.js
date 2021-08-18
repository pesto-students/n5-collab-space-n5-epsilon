import { addUserToProject } from "../../../src/server/apiEndPoints";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  const { userId, userEmail, projectId } = req.query;
  if (userId && projectId) {
    const addedUser = await addUserToProject(req.query);
    res.send(req.query);
  }
  return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
});

export default handler;
