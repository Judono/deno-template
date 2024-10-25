
import { sign, decode, verify} from "hono/jwt";

async function generateToken(payload: {id?: string, exp?: number}) {
  if (!payload.id) {
    return;
  }
  const token = await sign(payload, Deno.env.get("JWT_SECRET") || "");
  return token;
}

async function verifyToken(token: string) {
  const decodedToken = await verify(token, Deno.env.get("JWT_SECRET") || "");

  return decodedToken;
}

function decodeToken(token: string) {
  return decode(token);
}

export { generateToken, verifyToken, decodeToken };