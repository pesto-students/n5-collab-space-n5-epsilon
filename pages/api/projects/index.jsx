import { verify } from "jsonwebtoken";
import {
  deleteProject,
  getProjectsInfo,
  insertProject,
} from "../../../src/server/apiEndPoints";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const { userId, token } = req.query;
    const validToken = await verify(token, process.env.REACT_APP_SECRET_TOKEN);
    if (validToken) {
      const projects = await getProjectsInfo(userId);
      res.send({ projects });
    }
  } catch (error) {
    res.send({ error: "Token is invalid" });
  }
});

handler.post(async (req, res) => {
  const { userId } = req.cookies;
  if (!req.body) return res.status(400).send("You must write something");
  const projects = await insertProject(req.body, userId);
  console.log("this is response project ",projects)
  res.send(projects);
});

handler.delete(async (req, res) => {
  if (!req.body.projectId)
    return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
  const projects = await deleteProject(req.body.projectId);
  res.send(projects);
});

export default handler;
