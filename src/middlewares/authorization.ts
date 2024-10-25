import { HTTPException } from "hono/http-exception"
import { type Context, Next } from "hono"
import { verifyToken } from "../utils/jwt.ts";
import UserModel from "../models/user.model.ts";
import { UserContext } from "../user-context.ts";
import { Types } from "mongoose";
const validateToken = async (ctx : Context, next: Next) => {
  if (!ctx.req.header("Authorization")) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  const token = ctx.req.header("Authorization")?.split(" ")[1] ?? "";

  if (!token) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  const decodedToken = await verifyToken(token);

  if (!decodedToken) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  const user = await UserModel.findById(decodedToken.id).populate<{roleRef: {_id: Types.ObjectId; name: string} }>("roles", "name");

  if (!user) {
    throw new HTTPException(404, {
      message: "User not found",
    });
  }

  ctx.set("user", {
    id: user._id.toString(),
    email: user.email,
    role: user.roleRef.name,
  } as UserContext);


  await next();

}

export const validateAccess = (roles: string[]) => async (ctx: Context, next: Next) => {

  const user = ctx.get("user") as UserContext;

  if (!roles.includes(user.role)) {
    throw new HTTPException(403, {
      message: "Forbidden",
    });
  }

  await next();
}

const auth = validateToken;
const hasAnyRole = (roles: string[]) => [validateToken, validateAccess(roles)];

export { auth, hasAnyRole };