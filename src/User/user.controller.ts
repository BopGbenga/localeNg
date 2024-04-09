import UserModel from "../models/user.models";
// import UserModel, { User } from "../models/user.models";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../logger";
dotenv.config();

// creat user
const createUser = async (req: Request, res: Response) => {
  const userInfo = req.body;
  logger.info("creating user started");

  console.log(userInfo);

  //check for existing user
  const existingUser =
    userInfo && userInfo.email
      ? await UserModel.findOne({ email: userInfo.email })
      : null;

  if (existingUser) {
    return res.status(409).json({
      message: "user already exist",
      success: false,
    });
  }
  //create newuser
  const newUser = await UserModel.create(userInfo);
  res.status(201).json({
    message: "New user created",
    newUser,
  });
};

//user login
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(" user login started");

    const userInfo = req.body;

    console.log(userInfo);
    const user = await UserModel.findOne({
      email: userInfo.email,
    });
    if (!user) {
      return res.status(409).json({
        message: "user not found",
        success: false,
      });
    }

    const validPassword = await user.isValidPassword(userInfo.password);
    if (!validPassword) {
      logger.info("incorrect email or password");
      return res.status(422).json({
        message: "email or password is incorrect",
      });
    }
    const token = await jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "12h" }
    );
    res.status(200);
    return res.status(200).json({
      message: "login successful",
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default { createUser, login };
