import { getProject, updateProject } from "../../../src/server/db";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  const { projectId } = req.query;
  console.log("this is project id ", projectId, req.query);
  const projectinfo = await getProject(projectId);
  res.send(projectinfo);
});

handler.put(async (req, res) => {
  const { projectId, data } = req.query;
  console.log("this is project id ", projectId, req.query);
  const projectinfo = await updateProject(projectId, data);
  res.send(projectinfo);
});

export default handler;
