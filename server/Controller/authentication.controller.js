import User from "../Model/User.mongo.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import {
  comparePassword,
  hashPassword,
} from "../Helpers/authentication.helpers.js";
dotenv.config();

//things to do before saving to db

//add validation
export const register = async (req, res) => {
  try {
    //destructure email name password from req.body
    const { name, email, password, confirmPassword } = req.body;
    //all field require validation
    if (!name.trim()) {
      res.json("Name is required");
    }
    if (!email) {
      res.json("email MISSING");
    }
    if (!password || password.length < 6) {
      res.json("password must be 6 character long");
    }
    if (password != confirmPassword) {
      res.json("password does not match");
    }
    //check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ error: "email already taken" });
    }
    //hash password

    const hashedPassword = await hashPassword(password);
    const confirmHashedPassword = await hashPassword(confirmPassword);

    //register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: confirmHashedPassword,
    }).save();

    //jwt token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
export const logIn = async (req, res) => {
  try {
    //destructure email name password from req.body
    const { email, password } = req.body;
    //all field require validation

    if (!email) {
      res.json("email missing");
    }
    if (!password || password.length < 6) {
      res.json("password must be 6 character long");
    }

    //check if email is taken
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ error: "user not found" });
    }
    //compare password

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "wrong password" });
    }
    //jwt token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};
