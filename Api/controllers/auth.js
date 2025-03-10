import mongoose from "mongoose";
import User from "../models/User.js";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { createError } from "../error.js";

import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  try {
    const salt = genSaltSync(10);
    const hash = hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been Created!");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));
    const isValid = compareSync(req.body.password, user.password);
    if (!isValid) return next(createError(400, "wrong credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    const { password, ...other } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true, // Only on HTTPS
        sameSite: "strict", // Protect against CSRF
      })
      .status(200)
      .json({ ...other, token });
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...user._doc, token });
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const saveUser = await newUser.save();
      const token = jwt.sign({ id: saveUser._id }, process.env.JWT_SECRET_KEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(saveUser._doc);
    }
  } catch (error) {
    next(error);
  }
};
