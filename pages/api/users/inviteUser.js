import {
  addUserToProject,
  getAllInvitedUser,
} from "../../../src/server/apiEndPoints";
import { createHandler } from "../../../src/server/middleware";
const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const { userEmail, projectId } = req.query;

    if (userEmail && projectId) {
      const addedUser = await addUserToProject(req.query);
      res.send(addedUser);
    } else {
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    }
  } catch (err) {
    console.error(err);
  }
});

handler.post(async (req, res) => {
  try {
    if (req.body) {
      const invitedUserInfo = await getAllInvitedUser(req.body);
      res.send(invitedUserInfo);
    } else {
      return res.status(400).send(JSON.stringify({ error: "Invalid Request" }));
    }
  } catch (err) {
    console.error(err);
  }
});

export default handler;
