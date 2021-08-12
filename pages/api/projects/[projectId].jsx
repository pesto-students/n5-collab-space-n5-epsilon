import { getProject, updateProject } from "../../../src/server/db";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  if (!req.query)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const { projectId } = req.query;
  const projectInfo = await getProject(projectId);
  res.send(projectInfo);
});

handler.put(async (req, res) => {
  if (!req.query)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const { projectId, data } = req.query;
  const projectInfo = await updateProject(projectId, data);
  res.send(projectInfo);
});

export default handler;
