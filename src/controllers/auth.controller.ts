import {type Context} from "hono"
import { HTTPException} from "hono/http-exception"
import UserModel from "../models/user.model.ts";
import { comparePassword } from "../utils/bcrypt.ts";
import { generateToken } from "../utils/jwt.ts";

export async function login(ctx: Context) {
  const data = await ctx.req.json();

  const user = await UserModel.findOne({
    email: data.email,
  }).orFail(new HTTPException(404, {
    message: "User not found",
  })).populate("roleRef");

  const isPasswordMatch = await comparePassword(data.password, user.password);

  if (!isPasswordMatch) {
    throw new HTTPException(401, {
      message: "Bad credentials",
    });
  }

  const token = await generateToken({
    id: user._id.toString(),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  });
  
  return ctx.json({
    success: true,
    token : token,
    data: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.roleRef
    }
  });

}