import { Hono } from "hono"
import { login } from "../controllers/auth.controller.ts"

const router = new Hono()

router.post('/login', login);

export default router;