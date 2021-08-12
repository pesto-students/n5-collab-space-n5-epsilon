import {
  deleteProject,
  getProjectsInfo,
  insertProject,
} from "../../../src/server/apiEndPoints";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  const projects = await getProjectsInfo();
  res.send({ projects });
});

handler.post(async (req, res) => {
  if (!req.body) return res.status(400).send("You must write something");
  const projects = await insertProject(req.body);

  res.send(projects);
});

handler.delete(async (req, res) => {
  if (!req.body.projectId)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const projects = await deleteProject(req.body.projectId);
  res.send(projects);
});

export default handler;
