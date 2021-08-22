import { verify } from "jsonwebtoken";
import { getProject, updateProject } from "../../../src/server/apiEndPoints";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const { userId, token, projectId } = req.query;
    const validToken = await verify(token, process.env.REACT_APP_SECRET_TOKEN);
    if (validToken) {
      if (!req.query)
        return res
          .status(400)
          .send(JSON.stringify({ error: "Invalid Request" }));
      const projectInfo = await getProject(projectId, userId);
      res.send(projectInfo);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

handler.put(async (req, res) => {
  try {
    if (!req.query)
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    const { projectId, data } = req.query;
    const projectInfo = await updateProject(projectId, data);
    res.send(projectInfo);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
