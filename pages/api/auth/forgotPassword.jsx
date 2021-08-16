import { createHandler } from "../../../src/server/middleware";
import { sign } from "jsonwebtoken";
import UserData from "../../../src/server/models/userData";
import mailerService from "../../../src/server/Services/sendEmail";

const handler = createHandler();

handler.post(async (req, res) => {
  const user = await UserData.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(`Email doesn't exists`);
  const jwtToken = sign({ email: req.body.email }, process.env.EMAIL_TOKEN, {
    expiresIn: "300000",
  });
  mailerService(jwtToken, user.name).then((mailSent) => {
    if (mailSent) {
      res.status(200).send(`Email Sent`);
    } else {
      res.status(400).send(`Email Sending Failed`);
    }
  });
});

export default handler;
