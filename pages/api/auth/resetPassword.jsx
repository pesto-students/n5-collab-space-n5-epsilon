import { createHandler } from "../../../src/server/middleware";
import { compare, genSalt, hash } from 'bcryptjs'
import { verify, sign } from 'jsonwebtoken'
import UserData from "../../../src/server/models/userData";
import mailerService from "../../../server/Services/sendEmail";

// const handler = nextConnect();

// handler.use(middleware);
const handler = createHandler();


handler.get( async (req, res)=>{
  try{
    verify(req.query.token, process.env.EMAIL_TOKEN, async (error, decoded)=>{
      if(error) return res.status(400).send(`Invalid token`);
      const user = await UserData.findOne({email: decoded.email})
      console.log('user : ', user)

      const salt = await genSalt(16);
      await hash( req.body.password, salt).then( async (hashedPassword)=>{
        user.password = hashedPassword;
        await user.save().then(()=>{
          res.status(200).send(`Password Updated`);
          console.log('user : ', user, hashedPassword, req.body.password)
        });
      });
    });

  } catch(err) {
    res.json({message: err.message});
  }
});



export default handler;
