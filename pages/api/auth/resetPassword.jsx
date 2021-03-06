import { createHandler } from "../../../src/server/middleware";
import { genSalt, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import UserData from "../../../src/server/models/userData";

// const handler = nextConnect();

// handler.use(middleware);
const handler = createHandler();

handler.post(async (req, res) => {
  try {
    verify(req.body.token, process.env.EMAIL_TOKEN, async (error, decoded) => {
      if (error) return res.status(400).send(`Invalid token`);
      const user = await UserData.findOne({ email: decoded.email });

      const salt = await genSalt(16);
      await hash(req.body.password, salt).then(async (hashedPassword) => {
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
