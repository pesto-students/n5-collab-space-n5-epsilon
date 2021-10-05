import { createHandler } from "../../../src/server/middleware";
import { signUp_UserValidation } from "../../../src/server/Validations/userSchemaValidations";
import { genSalt, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import UserData from "../../../src/server/models/userData";

const handler = createHandler();

handler.post( async (req, res)=>{

  const {error} =  signUp_UserValidation(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  const emailExist = await UserData.findOne({email: req.body.email})
  if(emailExist) return res.status(400).send('Email already exists');

  const salt = await genSalt(6);
  const hashedPassword = await hash(req.body.password, salt);

  const newData = new UserData({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const newEntry = await newData.save();
    const jwtToken = sign({_id : newData._id}, process.env.REACT_APP_SECRET_TOKEN );
    res.json({
      name : newEntry.name,
      email: newEntry.email,
      id: newEntry._id,
      'auth-token': jwtToken
    });
  } catch(err) {
    res.json({message: err});
  }
});


export default handler;
