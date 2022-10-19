import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const savedUser = await newUser.save();

    res.status(200).send(savedUser);
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));

    const isPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isPassword)
      return next(createError(400, "wrong username or password"));

    res.status(200).json("login successfully");
  } catch (err) {
    return next(err);
  }
});

export default router;
