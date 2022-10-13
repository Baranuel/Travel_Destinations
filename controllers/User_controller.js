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

    res.
      cookie("token", token, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      })
      .json(`successfully logged in, Hello ${user.firstName}`);
  } catch (error) {
    console.log(error);
  }
};