import joi from "joi";
import { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const UserSchema = joi.object({
      username: joi.string().max(30).required(),

      email: joi.string().email().required(),

      password: joi.string().min(4).required(),
    });

    await UserSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: "registration falied",
      success: false,
    });
  }
};

const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const UserSchema = joi.object({
      email: joi.string().email().required(),

      password: joi.string().required(),
    });

    await UserSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: "validation falied",
      success: false,
    });
  }
};
export default { register, validateLogin };
