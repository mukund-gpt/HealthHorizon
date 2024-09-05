import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password, age, gender } = req.body;

  //validation
  let validUser = await User.findOne({ username });
  if (validUser) {
    return next(errorHandler(200, "Username already Exists"));
  }
  validUser = await User.findOne({ email });
  if (validUser) return next(errorHandler(200, "Email Already exists"));

  const hashedPassword = await bcryptjs.hash(password, 10);

  let profilePic;
  if (gender === "male") {
    profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  } else {
    profilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    age,
    gender,
    profilePic,
  });

  try {
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        sameSite: "None",
        secure: true,
      })
      .status(201)
      .json({
        id: newUser._id,
        username,
        email,
        age,
        gender,
        profilePic,
        success: true,
      });
    await newUser.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "error in signup",
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  let validUser = await User.findOne({ email });
  if (!validUser)
    return next(errorHandler(200, "Email Not exists, Signup plz ;)"));

  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword)
    return next(
      errorHandler(200, "Password galat hai 🤬, shi password daal ;)")
    );

  try {
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        sameSite: "None",
        secure: true,
      })
      .status(201)
      .json({
        id: validUser._id,
        username: validUser.username,
        email,
        age: validUser.age,
        gender: validUser.gender,
        profilePic: validUser.profilePic,
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "error in login",
    });
  }
};
