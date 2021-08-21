import { createHandler } from "../../../src/server/middleware";
// import { sign } from "jsonwebtoken";
// import UserData from "../../../src/server/models/userData";
import mailerService from "../../../src/server/Services/sendEmail";

const handler = createHandler();

handler.post(async (req, res) => {
  const { userEmail, projectId, userName } = req.body;
  // const user = await UserData.findOne({ email: userEmail });
  // if (!user) {
    mailerService(`/inviteUser?userEmail=${userEmail}?projectId=${projectId}`, userName, userEmail).then((mailSent) => {
      if (mailSent) {
        res.status(200).send(`Email Sent`);
      } else {
        res.status(400).send(`Email Sending Failed`);
      }
  // }
  // const jwtToken = sign({ email: req.body.email }, process.env.EMAIL_TOKEN, {
  //   expiresIn: "300000",
  // });
  });
});

export default handler;
