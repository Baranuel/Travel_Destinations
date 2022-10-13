import User from "../models/user-schema.js";
import { createToken } from "../middleware.js";

export const createUser = async (req, res) => {
  const payload = req.body;
  try {
    const user = new User(payload);
    await user.validate();
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const user = await User.findOne({
      userEmail: payload.userEmail,
      userPassword: payload.userPassword,
    });
    console.log(user);
    const token = createToken(user);
    console.log(token);

    res.
      cookie("token", token, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      })
      .json(`Log in successful. Hello ${user.userEmail}. We are sending your data and password (${user.userPassword}) to the FBI.`);
  } catch (error) {
    console.log(error);
  }
};