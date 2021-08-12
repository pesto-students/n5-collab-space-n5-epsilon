import { createHandler } from "../../../src/server/middleware";
import { login_UserValidation } from "../../../src/server/Validations/userSchemaValidations";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import UserData from "../../../src/server/models/userData";

const handler = createHandler();

handler.post( async (req, res)=>{

  const {error} = login_UserValidation(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  const user = await UserData.findOne({email: req.body.email})
  if(!user) return res.status(400).send(`Email doesn't exists`);

  const validPassword = await compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send(`Invalid Password`);

  const jwtToken = sign({_id : user._id}, process.env.REACT_APP_SECRET_TOKEN );
  res.json({
    name : user.name,
    email: user.email,
    id:user._id,
    'auth-token': jwtToken
  });
});


export default handler;
