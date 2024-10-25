
import {HTTPException} from "hono/http-exception"
import {HttpStatus} from "../constants.ts"

import { type Context } from "hono"

const errorHandler = (
  err: Error | HTTPException,
  ctx: Context, 
) => {
  const statusCode = (err instanceof HTTPException) ? err.status : HttpStatus.SERVER_ERROR;

  switch (statusCode) {
    case HttpStatus.BAD_REQUEST:
      return ctx.json({
        success: false,
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      }, HttpStatus.BAD_REQUEST);
    case HttpStatus.NOT_FOUND:
      return ctx.json({
        success: false,
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      }, HttpStatus.NOT_FOUND);
    case HttpStatus.UNAUTHORIZED:
      return ctx.json({
        success: false,
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      }, HttpStatus.UNAUTHORIZED);
    case HttpStatus.FORBIDDEN:
      return ctx.json({
        success: false,
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      }, HttpStatus.FORBIDDEN);
    default:
      return ctx.json({
        success: false,
        title: "Internal Server Error",
        message: err.message || err.cause,
        stackTrace: err.stack,
      }, HttpStatus.SERVER_ERROR);
  }
}

export default errorHandler;