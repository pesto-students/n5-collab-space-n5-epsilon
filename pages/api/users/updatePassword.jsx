import { createHandler } from "../../../src/server/middleware";
import { genSalt, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import UserData from "../../../src/server/models/userData";

// const handler = nextConnect();

// handler.use(middleware);
const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const { userEmail, token, newPassword } = req.body;
    const validToken = await verify(token, process.env.REACT_APP_SECRET_TOKEN);
    if (validToken) {
      const user = await UserData.findOne({ email: userEmail });
      const salt = await genSalt(16);
      await hash(newPassword, salt).then(async (hashedPassword) => {
        user.password = hashedPassword;
        await user.save().then(() => {
          res.status(200).send(`Password Updated`);
        });
      });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

export default handler;
