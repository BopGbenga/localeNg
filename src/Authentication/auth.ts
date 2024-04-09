import jwt from "jsonwebtoken";
import userModel from "../models/user.models";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const bearTokenAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "you are not authorized",
      });
    }
    const token = await authHeader.split(" ")[1];

    const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);

    const user = await userModel.findOne({ _id: (decoded as any)._id });

    if (!user) {
      return res.status(401).json({
        message: " user not found",
      });
    }
    req.body = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default bearTokenAuth;
