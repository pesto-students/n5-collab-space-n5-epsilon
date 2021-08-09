import { createHandler } from "../../../src/server/middleware";
import UserData from "../../../src/server/models/userData";

const handler = createHandler(); 

handler.get(async (req, res) => {
  const users = await UserData.find();
  res.json({ users });
});


export default handler;
