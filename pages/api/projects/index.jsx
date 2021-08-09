import nextConnect from "next-connect";
import { deleteProject, getProjectsInfo, insertProject } from "../../../src/server/db";
import { createHandler } from "../../../src/server/middleware";
//import { middleware as handler} from "../../../middleware/database";

// const handler = nextConnect();

// handler.use(middleware);
const handler = createHandler(); 

handler.get(async (req, res) => {
  const projects = await getProjectsInfo();
  res.send({ projects });
});

handler.post(async (req, res) => {
  if (!req.body)
    return res.status(400).send("You must write something");
  const projects = await insertProject(req.body);
  console.log("this is project",projects)
  res.send( projects );
});

handler.delete(async (req, res) => {
  if (!req.body.projectId)
    return res.status(400).send("You must provide ProjectId");
  const projects = await deleteProject(req.body.projectId);
  res.send(projects);
});

export default handler;
