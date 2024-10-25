
import { HTTPException} from "hono/http-exception"
import {type Context} from "hono"
import { ValidateUserRegister } from "../validation/user.validation.ts"
import {hashPassword} from "../utils/bcrypt.ts";
import UserModel from "../models/user.model.ts";
import RoleModel from "../models/role.model.ts";
import { UserRoles } from "../constants.ts";

function register(role: UserRoles) { 
  return async (ctx: Context) => {

    const data = await ctx.req.json();

    const { value, error } = ValidateUserRegister(data);

    if (error) {
      throw new HTTPException(400, error);
    }

    try {
    
      const userRole = await RoleModel.findOne({ name: role })
      .orFail(new HTTPException(404, {
        message: "Role not found",
      }));

      const hashedPassword = await hashPassword(value.password);

      const user = new UserModel({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: hashedPassword,
        roleRef: userRole?._id,
      });

      const result = await user.save();

      return ctx.json({
        success: true,
        data: {
          id: result?._id,
          firstName: result?.firstName,
          lastName: result?.lastName,
          email: result?.email,
          role: result?.roleRef,
        },
      });
    }

    catch (error) {
      if (error instanceof Error) {
        throw new HTTPException(500, error);
      }
      throw Error("an error occurred");
    }
    
  }
}

export {register};